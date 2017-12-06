var express = require('express');
var api = express.Router();
var seriesDb = require('../dbFetch/seriesDB.js');
var storyDb = require('../dbFetch/storyDB.js');
var authorDb = require('../dbFetch/authorDB.js');
var AWS = require('aws-sdk');
var UserAnalyticsUtils = require('../utils/userAnalyticsUtils.js');


const conn = require('../utils/connections.js');
const error = {
  code:'BS601',
  msg:'Internal Error'
}


api.route('/search')
  .get(function(req, res){
      const searchString = req.query.q
      searchByNames(searchString,function(list){
        res.send(list);
      })
  })

  api.route('/')
    .get(function(req, res){
      var tsFilter = req.query.lastts;
      if(!tsFilter){
        var date = new Date("2017/02/01");
        tsFilter = date.getTime()
      }else{
        tsFilter = Number(tsFilter);
      }

      var limit = req.query.limit;
      var scorePercent = req.query.score;
      var score = 70

      if(scorePercent){
          score = Number(scorePercent)
      }

      var callback = function(list){
        res.send(list);
      }
      var stories;
      var seriesList;

      getStories(tsFilter,score,limit,function(list){
        stories = list.slice(0, 6);
        if(seriesList){
          mergeList(seriesList,stories,[],callback)
        }
      })

      var tsFilterSeries = req.query.serieslastts;

      if(!tsFilterSeries){
        seriesList = []
      }else{
        getSeriesList(tsFilterSeries,(score+10),limit,function(list){
          seriesList = list.slice(0, 2);
          if(stories){
            mergeList(seriesList,stories,[],callback)
          }
        })
      }

    })


  function getStories(ts,score,limit,callback){
      const docClient = conn.getDocClient();
      var params = {
          IndexName: "RecentIndex",
          KeyConditionExpression: "#l = :lang and #ts > :timestamp",
          FilterExpression:"#score > :score",
          ExpressionAttributeNames:{
              "#l": "lang",
              "#ts" : "timestamp",
              "#score": "score"
          },
          ExpressionAttributeValues: {
              ":lang":"telugu",
              ":timestamp":ts,
              ":score":score
          },
          ScanIndexForward:true,
          Limit:20
      };

      if(limit){
        params.Limit = limit
      }

       storyDb.query(params,docClient,callback);
  }

  function getSeriesList(ts,score,limit,callback){
      const docClient = conn.getDocClient();
      var params = {
          IndexName: "RecentIndex",
          KeyConditionExpression: "#l = :lang and #ts > :timestamp",
          FilterExpression:"#score > :score",
          ExpressionAttributeNames:{
              "#l": "lang",
              "#ts" : "lastUpdated",
              "#score": "score"
          },
          ExpressionAttributeValues: {
              ":lang":"telugu",
              ":timestamp":ts,
              ":score":score
          },
          ScanIndexForward:true,
          Limit:20
      };

      if(limit){
        params.Limit = limit
      }

       seriesDb.query(params,docClient,callback);
  }


  function searchByNames(searchString,callback){
    var seriesList;
    var stories;
    var authors;

    var seriesCallBack = function(list){
      var filtered = list.slice(0, 3);
      seriesList = list;

      if(seriesList && stories && authors){
        mergeList(seriesList,stories,authors,callback)
      }
    }
    searchBySeriesNames(searchString,seriesCallBack);

    var storiesCallBack = function(list){
      var filtered = list.slice(0, 3);
      stories = list;
      if(seriesList && stories && authors){
        mergeList(seriesList,stories,authors,callback)
      }
    }
    searchByStoryNames(searchString,storiesCallBack);

    var authorsCallBack = function(list){
      var filtered = list.slice(0, 3);
      authors = list;
      if(seriesList && stories && authors){
        mergeList(seriesList,stories,authors,callback)
      }
    }
    searchByAuthorNames(searchString,authorsCallBack);
  }

  function mergeList(seriesList,stories,authors,callback){
    var items = [];
    var i = 0;

    while(i<3){

      if(i < stories.length){
         var item = stories[i];
         item.type = "story"
         items.push(item)
      }

      if(i < seriesList.length){
         var item = seriesList[i];
         item.type = "series"
         items.push(item)
      }

      if(i < authors.length){
         var item =  authors[i]
         item.type = "author"
         items.push(item)
      }

      i++;
    }
    callback(items);
  }

  function searchBySeriesNames(sub,callback){
      const docClient = conn.getDocClient();
      var params = {
          IndexName: "RecentIndex",
          KeyConditionExpression: "#l = :lang",
          FilterExpression: "contains(#name, :v_sub)",
          ExpressionAttributeNames:{
              "#l": "lang",
              "#name": "name"
          },
          ExpressionAttributeValues: {
              ":lang":"telugu",
              ":v_sub":sub
          },
          ScanIndexForward:false
      };
     seriesDb.query(params,docClient,callback);
  }

  function searchByStoryNames(sub,callback){
      const docClient = conn.getDocClient();
      var params = {
          IndexName: "RecentIndex",
          KeyConditionExpression: "#l = :lang",
          FilterExpression: "contains(#name, :v_sub)",
          ExpressionAttributeNames:{
              "#l": "lang",
              "#name": "name"
          },
          ExpressionAttributeValues: {
              ":lang":"telugu",
              ":v_sub":sub
          },
          ScanIndexForward:false
      };
      storyDb.query(params,docClient,callback);
  }

  function searchByAuthorNames(sub,callback){
      const docClient = conn.getDocClient();
      var params = {
          ProjectionExpression: "#name,profile",
          FilterExpression: "contains(#name, :v_sub)",
          ExpressionAttributeNames:{
              "#name": "penName"
          },
          ExpressionAttributeValues: {
              ":v_sub":sub
          }
      };
     authorDb.scan(params,docClient,callback);
  }

  module.exports = api;
