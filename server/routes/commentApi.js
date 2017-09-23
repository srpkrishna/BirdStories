var express = require('express');
var api = express.Router();
var commentDB = require('../dbFetch/commentDB.js');

const conn = require('../utils/connections.js');
const emailClient = require('../utils/sendEmail.js');
const error = {
  code:'BS401',
  msg:'Internal Error'
}

api.route('/:id')
  .get(function(req, res){
      const postId = req.params.id;
      var tsFilter = req.query.lastts;
      if(!tsFilter){
        tsFilter = Date.now();
      }else{
        tsFilter = Number(tsFilter);
      }


      getComments(postId,tsFilter,function(comments){
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

    if(req.body.authorEmail){
      comment["authorEmail"] = req.body.authorEmail;
    }
    postComment(comment,function(data){
      res.send(data);

      if(req.body.authorEmail && req.body.authorEmail !== req.body.userEmail){
        var storyName = ""
        if(req.body.storyName){
          storyName = req.body.storyName;
        }

        var authorName = ""
        if(req.body.authorName){
          authorName = req.body.authorName;
        }

        var userName = ""
        if(req.body.userName){
          userName = req.body.userName;
        }
        emailClient.sendEmailToAuthor(req.body.authorEmail, storyName, authorName ,userName,req.body.link)

         if(req.body.replyTo && req.body.replyToName){
           emailClient.sendEmailToCommentOwner(req.body.replyTo, req.body.replyToName , storyName,userName,req.body.link)
         }
      }
    })
  })


function getComments(postId,ts,callback){
    const docClient = conn.getDocClient();
    var params = {
        KeyConditionExpression: "#id = :postId and #ts < :timestamp",
        ExpressionAttributeNames:{
            "#id": "postId",
            "#ts": "timestamp"
        },
        ExpressionAttributeValues: {
            ":postId":postId,
            ":timestamp":ts
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
