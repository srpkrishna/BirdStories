var express = require('express');
var api = express.Router();
var seriesDb = require('../dbFetch/seriesDB.js');
var AWS = require('aws-sdk');
var fs = require('fs');

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
        res.send(seriesList);
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

      getSeriesList(tsFilter,function(seriesList){
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
            var seriesId = id["author"]+id["timestamp"]+key
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

function getSeriesList(ts,callback){
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
    // let responseData
    // function scoreSuccess(data){
    //   callback(responseData);
    // }

    function socialSuccess(data){
        //const score = getScore(data.Attributes.social);
        var responseData = data.Attributes;
        callback(responseData);
        // responseData.score = score;
        // updateScore(id,score,docClient,scoreSuccess);
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
