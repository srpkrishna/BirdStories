var express = require('express');
var api = express.Router();
var storyDb = require('../dbFetch/storyDB.js');
var AWS = require('aws-sdk');

const conn = require('../utils/connections.js');
const error = {
  code:'BS101',
  msg:'Internal Error'
}

/* GET home page. */
api.route('/search')
  .get(function(req, res){
      const searchString = req.query.q
      searchByNames(searchString,function(stories){
        res.send(stories);
      })
  })


api.route('/:author/:name')
  .get(function(req, res){
    console.log(req.params.author);
    console.log(req.params.name);
    var s3 = new AWS.S3({ region:"ap-south-1","signatureVersion":"v4"});
    console.log(req.params.name);
    var bucketName = 'bsstory';
    var keyName = 'phani/sample/story.json';
    var regio
    var params = {Bucket: bucketName, Key: keyName};
    s3.getObject(params, function(err, data) {
      if (err){
        res.send(error)
      }else {
        var fileContents = data.Body.toString();
        console.log(fileContents);
        var json = JSON.parse(fileContents);
        res.send(fileContents);
      }
    });
  })

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
          res.send(error); //give proper error case
      }
    })

function getStories(callback){
    const docClient = conn.getDocClient();
    var params = {
        IndexName: "RecentIndex",
        KeyConditionExpression: "#l = :lang",
        ExpressionAttributeNames:{
            "#l": "lang"
        },
        ExpressionAttributeValues: {
            ":lang":"telugu"
        },
        Limit: 10,
        ScanIndexForward:false
    };
     storyDb.query(params,docClient,callback);
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
        Limit: 10,
        ScanIndexForward:false
    };
    console.log('hello')
   storyDb.query(params,docClient,callback);
}

function updateSocialElements(id,element,callback)
{
    const docClient = conn.getDocClient();
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
