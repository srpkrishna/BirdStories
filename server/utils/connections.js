function getDocClient(){
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

const conn = {
  getDocClient:getDocClient
}
module.exports = conn;
