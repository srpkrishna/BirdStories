var express = require('express');
var api = express.Router();
var seriesDb = require('../dbFetch/seriesDB.js');
var AWS = require('aws-sdk');
var fs = require('fs');
var UserAnalyticsUtils = require('../utils/userAnalyticsUtils.js');

const conn = require('../utils/connections.js');
const error = {
  code:'BS101',
  msg:'Internal Error'
}

const alreadyUpdated = {
  code:'BS102',
  msg:'alreadyUpdated'
}

/* GET home page. */
api.route('/search')
  .get(function(req, res){
      const searchString = req.query.q
      searchByNames(searchString,function(seriesList){
        var filtered = seriesList.slice(0, 3);
        res.send(filtered);
      })
  })

api.route('/content/:authorId/:name/:episode')
  .get(function(req, res){
    // var filepath = __dirname + '/story.json';
    // fs.readFile(filepath, "utf8", function(err, data){
    //   if(err){
    //     console.log(err);
    //   }
    //  var story = JSON.parse(data);
    //  res.send(story);
    // });

    var s3 = new AWS.S3({ region:"ap-south-1","signatureVersion":"v4",endpoint:"https://s3.ap-south-1.amazonaws.com"});
    var bucketName = 'bsstory';
    var episode = "";

    if(req.params.episode){
      episode = "/"+req.params.episode
    }

    var keyName = req.params.authorId+'/'+req.params.name+episode+'/story.json';
    var params = {Bucket: bucketName, Key: keyName};
    s3.getObject(params, function(err, data) {
      if (err){
        res.send(err)
      }else {
        var fileContents = data.Body.toString();
        var json = JSON.parse(fileContents);
        res.send(json);
      }
    });
  })

  api.route('/content/:authorId/:name')
    .get(function(req, res){
      // var filepath = __dirname + '/story.json';
      // fs.readFile(filepath, "utf8", function(err, data){
      //   if(err){
      //     console.log(err);
      //   }
      //  var story = JSON.parse(data);
      //  res.send(story);
      // });

      var s3 = new AWS.S3({ region:"ap-south-1","signatureVersion":"v4",endpoint:"https://s3.ap-south-1.amazonaws.com"});
      var bucketName = 'bsstory';
      var keyName = req.params.authorId+'/'+req.params.name+'/story.json';
      var params = {Bucket: bucketName, Key: keyName};
      s3.getObject(params, function(err, data) {
        if (err){
          res.send(err)
        }else {
          var fileContents = data.Body.toString();
          var json = JSON.parse(fileContents);
          res.send(json);
        }
      });
    })

api.route('/:authorId/:id')
  .get(function(req, res){
      const authorId = req.params.authorId
      const id = Number(req.params.id)

      if(!authorId || !id){
          res.send(error);
      }
      getSeries(authorId,id,function(seriesList){
        if(seriesList && seriesList.length > 0){
            res.send(seriesList[0]);
        }else {
            res.send({});
        }
      })
  })

api.route('/:authorId')
  .get(function(req, res){
      const authorId = req.params.authorId
      getAuthorSeriesList(authorId,function(seriesList){
        res.send(seriesList);
      })
  })

api.route('/')
  .get(function(req, res){
      var tsFilter = req.query.lastts;
      if(!tsFilter){
        tsFilter = Date.now();
      }else{
        tsFilter = Number(tsFilter);
      }
      var limit = req.query.limit;
      getSeriesList(tsFilter,limit,function(seriesList){
        res.send(seriesList);
      })
  })
  .post(function (req, res) {
      var id = req.body.id;
      var attr = req.body.updateAttr;
      switch(attr){
        case 'social':
          var key = req.body.updateKey;
          if(key === "reads" || key === "likes"){
            var seriesId = id["author"]+id["timestamp"]+id["episode"]+key
            if(req.session[seriesId]){
              res.send(alreadyUpdated);
              return;
            }else{
              req.session[seriesId] = true;
            }
          }
          updateSocialElements(id,key,function(result){
            res.send(result);
          })
          break;
        default:
          res.send(error); //give proper error case
      }
    })

api.route('*')
  .get(function(req, res){
      res.send('no api found');
  })

function getSeries(authorId,id,callback){
  const docClient = conn.getDocClient();
  var params = {
      KeyConditionExpression: "#author = :authorId and #ts = :timestamp",
      ExpressionAttributeNames:{
          "#author" : "author",
          "#ts" : "timestamp"
      },
      ExpressionAttributeValues: {
          ":authorId":authorId,
          ":timestamp":id
      }
  };
  seriesDb.query(params,docClient,callback);
}
function getAuthorSeriesList(authorId,callback){
    const docClient = conn.getDocClient();
    var params = {
        KeyConditionExpression: "author = :id",
        ExpressionAttributeValues: {
            ":id":authorId
        },
        Limit: 10,
        ScanIndexForward:false
    };
    seriesDb.query(params,docClient,callback);
}

function getSeriesList(ts,limit,callback){
    const docClient = conn.getDocClient();
    var params = {
        IndexName: "RecentIndex",
        KeyConditionExpression: "#l = :lang and #ts < :timestamp",
        ExpressionAttributeNames:{
            "#l": "lang",
            "#ts" : "lastUpdated"
        },
        ExpressionAttributeValues: {
            ":lang":"telugu",
            ":timestamp":ts
        },
        ScanIndexForward:false,
        Limit:2
    };

    if(limit){
      params.Limit = limit
    }
     seriesDb.query(params,docClient,callback);
}

function searchByNames(sub,callback){
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

function updateSocialElements(id,element,callback)
{
    const docClient = conn.getDocClient();
    function generalSuccess(data){
      //console.log(data,id)
    }

    function socialSuccess(data){
        var responseData = data.Attributes;
        callback(responseData);

        const score = getScore(data.Attributes.social,id.timestamp,responseData.episodeTimes);
        updateScore(id,score,docClient,generalSuccess);

        if(id.user && id.user.email){
          UserAnalyticsUtils.update(id,responseData,element,generalSuccess)
        }
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
            ReturnValues:"ALL_NEW"
        };


  seriesDb.update(params,docClient,callback);
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

  seriesDb.update(params,docClient,callback);
}

function getScore(social, timestamp,times) {
   var views = social.views;
   var timesSum = 0
   for (i in times){
     timesSum = timesSum + times[i]
   }

   var time = (timesSum/times.length)

   time = Math.round(time);

   var viewsPercent = 0.45

   if(time <= 1){
     viewsPercent = 0.75
   }else if(time <= 2){
     viewsPercent = 0.45
   }else if(time <= 5){
     viewsPercent = 0.30
   }else if(time <= 9){
     viewsPercent = 0.25
   }else{
     viewsPercent = 0.22
   }

   var percent = 0.025
   if(timestamp < 1496221945000){
     percent = 0.01
     viewsPercent = 0.20
   }

   var score1 =  social.reads / (views * viewsPercent)
   var score2 =  (social.likes + (social.shares * 1.2) + social.comments) / (views * percent)
   if(score2 > 1.25){
     score2 = 1.25
   }

   var score = ((score1*6)+(score2*4))/10
   score = score * 100

   if(score > 100){
     score = 100
   }

  return score
}

module.exports = api;
