var express = require('express');
var api = express.Router();
var authorDb = require('../dbFetch/authorDB.js');
var storyDb = require('../dbFetch/storyDB.js');
const conn = require('../utils/connections.js');
const error = {
  code:'BS301',
  msg:'Internal Error'
}

api.all('*',function(req, res, next) {
  next();
  // var token = req.body.token;
  // var service = req.body.service;
  // conn.authorize(service,token,function(success){
  //     if(success){
  //       next();
  //     }else{
  //       res.status(401).send('unauthorized');
  //       return;
  //     }
  // })
});

api.route('/me')
  .post(function(req, res){
    var email = req.body.id;//'phani@email.com';
    var resBody = {}
    getAuthorDetails(email,function(authData){
      console.log(authData);
      if(authData.length < 1){
        res.send("");
        return;
      }
      resBody.author = authData[0];
      getAuthorStories(authData[0].penName,function(stories){
          resBody.stories = stories;
          res.send(resBody);
      })

    });
  })


function getAuthorDetails(authorId,callback){
    const docClient = conn.getDocClient();
    var params = {
        KeyConditionExpression: "#email = :id",
        ExpressionAttributeNames:{
            "#email": 'email'
        },
        ExpressionAttributeValues: {
            ":id":authorId
        }
    };
   authorDb.query(params,docClient,callback);
}

function getAuthorStories(penName,callback){
    const docClient = conn.getDocClient();
    console.log(penName);
    var params = {
        KeyConditionExpression: "author = :id",
        ExpressionAttributeValues: {
            ":id":penName
        },
        Limit: 10,
        ScanIndexForward:false
    };
    storyDb.query(params,docClient,callback);
}

module.exports = api;
