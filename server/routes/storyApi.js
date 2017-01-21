var express = require('express');
var api = express.Router();
var storyDb = require('../dbFetch/storyDB.js');

/* GET home page. */
api.route('/')
  .get(function(req, res){
      getStories(function(stories){
        res.send(stories);
      })
  })
  .post(function (req, res) {
      var id = req.body.id;
      var attr = req.body.updateAttr;
      switch(attr){
        case 'social':
          var key = req.body.updateKey;
          updateSocialElements(id,key,function(result){
            res.send(result);
          })
          break;
        default:
          res.send('No attr key found'); //give proper error case
      }
    })

function getStories(callback){
    var AWS = require('aws-sdk');
    AWS.config.update({
      region: 'us-west-2',
      endpoint: 'http://localhost:8000'
    });
    var dynamodb = new AWS.DynamoDB();
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        IndexName: "RecentIndex",
        KeyConditionExpression: "#y = :yr",
        ExpressionAttributeNames:{
            "#y": "year"
        },
        ExpressionAttributeValues: {
            ":yr":2017
        },
        Limit: 10,
        ScanIndexForward:false
    };
     storyDb.queryStories(params,docClient,callback);
}

function updateSocialElements(id,element,callback)
{
    var AWS = require('aws-sdk');
    AWS.config.update({
      region: 'us-west-2',
      endpoint: 'http://localhost:8000'
    });
    var dynamodb = new AWS.DynamoDB();
    var docClient = new AWS.DynamoDB.DocumentClient();

    let responseData
    function scoreSuccess(data){
      callback(responseData);
    }

    function socialSuccess(data){
        const score = getScore(data.Attributes.social);
        responseData = data.Attributes;
        responseData.score = score;
        updateScore(id,score,docClient,scoreSuccess);
    }

    updateSocial(id,element,docClient,socialSuccess)

}

function updateSocial(id,element,docClient,callback){

  var params = {
            Key: {
                author : id["author"],
                timestamp : id["timestamp"]
            },
            UpdateExpression: "ADD social.#counter :incva",
            ExpressionAttributeNames:{
                "#counter":element
            },
            ExpressionAttributeValues:{
                ":incva":1
            },
            ReturnValues:"UPDATED_NEW"
        };


  storyDb.update(params,docClient,callback);
}

function updateScore(id,value,docClient,callback){
  var params = {
            Key: {
                author : id["author"],
                timestamp : id["timestamp"]
            },
            UpdateExpression: "SET score = :val",
            ExpressionAttributeValues:{
                ":val":value
            },
            ReturnValues:"UPDATED_NEW"
        };

  storyDb.update(params,docClient,callback);
}

function getScore(social) {
   var score =  social.views * 0.05
       score = score + social.reads * 0.15
       score = score + social.shares * 0.30
       score = score + social.favs * 0.20
       score = score + social.readLater * 0.10
       score = score + social.comment * 0.20

    return score
}

module.exports = api;
