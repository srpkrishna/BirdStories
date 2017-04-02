var uuid = require('node-uuid');
const tableName = "User"
const error = {
  code:'BS500',
  msg:'Internal Error'
}

var query = function(params,docClient,callback){
  params["TableName"] = tableName
  docClient.query(params, function(err, data) {
      if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          callback(error);
      } else {
          callback(data.Items);
      }
  });
}

var insert = function(user,docClient,callback){
  var date = new Date();
  user["timestamp"] = Number(date);
  user["id"] = uuid.v4();
  var row = {
    TableName : tableName,
    Item: user
  }

  docClient.put(row, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        callback(error);
    } else {
        callback(user);
    }
  });
}

var users = {
    query:query,
    insert:insert
  };

module.exports = users;
