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
    console.log('hello')
   authorDb.scan(params,docClient,callback);
}

module.exports = api;
