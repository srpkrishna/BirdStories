var uuid = require('node-uuid');
const tableName = "UserAnalytics"
const error = {
  code:'BS700',
  msg:'Internal Error'
}

var query = function(params,docClient,callback){
  params["TableName"] = tableName
  docClient.query(params, function(err, data) {
      if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          callback(null);
      } else {
          callback(data.Items);
      }
  });
}

var insert = function(item,docClient,callback){

  var row = {
    TableName : tableName,
    Item:item
  }

  docClient.put(row, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        callback(error);
    } else {
        callback(data);
    }
  });

}

var userAnalytics = {
    query:query,
    insert:insert
  };

module.exports = userAnalytics;
