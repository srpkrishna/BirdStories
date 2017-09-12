const tableName = "Client"
const error = {
  code:'BS600',
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

var update = function(updateParams,docClient,callback){
  updateParams["TableName"] = tableName
  docClient.update(updateParams, function(err, data) {
      if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          callback(error);
      } else {
          callback(data);
      }
  });
}

var insert = function(clientInfo,docClient,callback){
  var row = {
    TableName : tableName,
    Item: clientInfo
  }

  docClient.put(row, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        callback(error);
    } else {
        callback(clientInfo);
    }
  });
}

var users = {
    query:query,
    insert:insert,
    update:update
  };

module.exports = users;
