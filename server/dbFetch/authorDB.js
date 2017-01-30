const tableName = "Author"
const error = {
  code:'BS200',
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

var scan = function(params,docClient,callback){
  params["TableName"] = tableName
  docClient.scan(params, function(err, data) {
      if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          callback(error);
      } else {
          callback(data.Items);
      }
  });
}

var authors = {
    query:query,
    scan:scan
  };

module.exports = authors;
