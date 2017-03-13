var express = require('express');
var api = express.Router();
var commentDB = require('../dbFetch/commentDB.js');

const conn = require('../utils/connections.js');
const error = {
  code:'BS401',
  msg:'Internal Error'
}

api.route('/:id')
  .get(function(req, res){
      const postId = req.params.id;
      getComments(postId,function(comments){
        res.send(comments);
      })
  })
  .post(function(req, res){
    const postId = req.params.id;
    var comment = {};
    comment["postId"] = postId;
    comment["text"] = req.body.text;

    if(req.body.userName){
      comment["userName"] = req.body.userName;
    }

    if(req.body.userEmail){
      comment["userEmail"] = req.body.userEmail;
    }

    if(req.body.replyTo){
      comment["mentionUserEmail"] = req.body.replyTo;
    }

    postComment(comment,function(data){
      res.send(data);
    })
  })


function getComments(postId,callback){
    const docClient = conn.getDocClient();
    var params = {
        KeyConditionExpression: "#id = :postId",
        ExpressionAttributeNames:{
            "#id": "postId"
        },
        ExpressionAttributeValues: {
            ":postId":postId
        },
        Limit: 5,
        ScanIndexForward:false
    };
    commentDB.query(params,docClient,callback);
}

function postComment(comment,callback){
    const docClient = conn.getDocClient();
    commentDB.insert(comment,docClient,callback);
}

module.exports = api;
