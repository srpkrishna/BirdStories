var express = require('express');
var api = express.Router();
var authorDb = require('../dbFetch/authorDB.js');
const conn = require('../utils/connections.js');
const error = {
  code:'BS201',
  msg:'Internal Error'
}

api.route('/search')
  .get(function(req, res){
      const searchString = req.query.q
      searchByNames(searchString,function(authors){
        res.send(authors);
      })
  })

  api.route('/:authorId')
    .get(function(req, res){
        const authorId = req.params.authorId;
        console.log(authorId)
        getAuthorDetails(authorId,function(authors){
          if(authors && authors.length > 0){
              res.send(authors[0]);
          }else {
              res.send({});
          }
        })
    })

  api.route('*')
    .get(function(req, res){
        res.send('no api found');
    })

function getAuthorDetails(authorId,callback){
    const docClient = conn.getDocClient();
    var params = {
        IndexName: "ProfileIndex",
        KeyConditionExpression: "#pen = :id",
        ExpressionAttributeNames:{
            "#pen": "penName"
        },
        ExpressionAttributeValues: {
            ":id":authorId
        }
    };
   authorDb.query(params,docClient,callback);
}
function searchByNames(sub,callback){
    const docClient = conn.getDocClient();
    var params = {
        ProjectionExpression: "#name,profile",
        FilterExpression: "contains(#name, :v_sub)",
        ExpressionAttributeNames:{
            "#name": "penName"
        },
        ExpressionAttributeValues: {
            ":v_sub":sub
        },
        Limit:10
    };
   authorDb.scan(params,docClient,callback);
}

module.exports = api;
