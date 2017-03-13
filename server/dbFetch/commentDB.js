const tableName = "Comment"
const error = {
  code:'BS400',
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

var insert = function(comment,docClient,callback){
  var date = new Date();
  comment["timestamp"] = Number(date);
  var row = {
    TableName : tableName,
    Item: comment
  }

  docClient.put(row, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        callback(error);
    } else {
        callback(comment);
    }
  });
}

var comments = {
    query:query,
    insert:insert
  };

module.exports = comments;
