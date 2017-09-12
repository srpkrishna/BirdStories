var express = require('express');
var api = express.Router();
var clientInfoDB = require('../dbFetch/clientInfoDB.js');

const conn = require('../utils/connections.js');
const error = {
  code:'BS601',
  msg:'Internal Error'
}

api.route('/')
  .post(function (req, res) {
      if(!req.body.id && !req.body.platform && !req.body.token){
        res.send(error);
        return
      }

      var clientInfo = {}
      clientInfo.id = req.body.id;
      var platform = "ios"
      var platformName = req.body.platform.toLowerCase()
      if(platformName.indexOf("android") !== -1){
        platform = "android"
      }

      clientInfo.platform = platform;
      if(req.body.email){
        clientInfo.email = req.body.email;
      }

      if(req.body.userId){
        clientInfo.userId = req.body.userId;
      }

      clientInfo.token = req.body.token;
      clientInfo.version = req.body.version;

      var date = new Date();
      clientInfo.lastUpdated =  Number(date);
      updateClient(clientInfo,function(client){
        if(client){
          res.send(client);
        }else{
          addClient(clientInfo,function(client){
              res.send(client);
          })
        }
      })
  })

  function addClient(clientInfo,callback){
    const docClient = conn.getDocClient();
    clientInfoDB.insert(clientInfo,docClient,callback);
  }

  function updateClient(clientInfo,callback){
    const docClient = conn.getDocClient();

    var params = {
              Key: {
                  id : clientInfo.id,
                  platform : clientInfo.platform
              },
              UpdateExpression: "SET  #token = :token, #lastUpdated = :lastUpdated, #version = :version",
              ExpressionAttributeNames:{
                  "#token":"token",
                  "#lastUpdated":"lastUpdated",
                  "#version":"version"
              },
              ExpressionAttributeValues:{
                  ":token":clientInfo.token,
                  ":lastUpdated":clientInfo.lastUpdated,
                  ":version":clientInfo.version
              },
              ReturnValues:"UPDATED_NEW"
          };

    if(clientInfo.email && clientInfo.userId){
      params = {
                Key: {
                    id : clientInfo.id,
                    platform : clientInfo.platform
                },
                UpdateExpression: "SET #email = :email, #token = :token, #userId = :userId, #lastUpdated = :lastUpdated, #version = :version",
                ExpressionAttributeNames:{
                    "#email":"email",
                    "#token":"token",
                    "#userId":"userId",
                    "#lastUpdated":"lastUpdated",
                    "#version":"version"
                },
                ExpressionAttributeValues:{
                    ":email":clientInfo.email,
                    ":token":clientInfo.token,
                    ":userId":clientInfo.userId,
                    ":lastUpdated":clientInfo.lastUpdated,
                    ":version":clientInfo.version
                },
                ReturnValues:"UPDATED_NEW"
            };
    }
    clientInfoDB.update(params,docClient,callback);
  }

module.exports = api;
