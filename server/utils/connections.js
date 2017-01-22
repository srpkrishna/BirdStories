function getDocClient(){
  var AWS = require('aws-sdk');
  AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
  });
  var dynamodb = new AWS.DynamoDB();
  var docClient = new AWS.DynamoDB.DocumentClient();

  return docClient
}

const conn = {
  getDocClient:getDocClient
}
module.exports = conn;
