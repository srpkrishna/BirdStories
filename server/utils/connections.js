function getAwsDocClient(){
  var AWS = require('aws-sdk');
  var environment = process.env.NODE_ENV;
  var endpoint = "http://localhost:8000";
  var region = "us-west-2"
  if(environment && environment === "production"){
    endpoint = "https://dynamodb.ap-south-1.amazonaws.com";
    region = "ap-south-1"
  }

  AWS.config.update({
    region: region,
    endpoint: endpoint
  });
  var dynamodb = new AWS.DynamoDB();
  var docClient = new AWS.DynamoDB.DocumentClient();

  return docClient
}

function getGClientId(){
  var id = '113332297879-2c0bl4e42qokglovtthficb1ubvldgch.apps.googleusercontent.com'
}

function getFbClientId(){
  return '1882742771959476'
}

function verifyGToken(token,callback){
  var id = getGClientId()
  var GoogleAuth = require('google-auth-library');
  var auth = new GoogleAuth;
  var client = new auth.OAuth2(CLIENT_ID, '', '');
  client.verifyIdToken(
      token,
      id,
      function(e, login) {
        var payload = login.getPayload();
        var userid = payload['sub'];
        callback(true)
      });
}

function verifyAccess(service,token,callback){
  if(!token && !service){
    callback(true)
    return
  }

  if("google" === service){
      verifyGToken(token,callback)
  }else{
      callback(false)
  }
}

const conn = {
  getDocClient:getAwsDocClient,
  authorize:verifyAccess
}
module.exports = conn;
