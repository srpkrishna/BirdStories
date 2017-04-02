var express = require('express');
var api = express.Router();
var userDB = require('../dbFetch/userDB.js');

const conn = require('../utils/connections.js');
const error = {
  code:'BS501',
  msg:'Internal Error'
}

api.route('/')
  .post(function (req, res) {
      const email = req.body.email;
      const name = req.body.name;
      getUser(email,function(users){
        if(users && users.length > 0){
            res.send(users[0]);
        }else{
          addUser(email,name,function(user){
              res.send(user);
          })
        }
      })
  })

  function getUser(email,callback){
      const docClient = conn.getDocClient();
      var params = {
          KeyConditionExpression: "#email = :emailId",
          ExpressionAttributeNames:{
              "#email": "email"
          },
          ExpressionAttributeValues: {
              ":emailId":email
          }
      };
      userDB.query(params,docClient,callback);
  }

  function addUser(email,name,callback){
    const docClient = conn.getDocClient();
    var user = {
      email:email,
      name:name
    }
    userDB.insert(user,docClient,callback);
  }


module.exports = api;
