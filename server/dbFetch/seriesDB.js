const tableName = "Series"
const error = {
  code:'BS100',
  msg:'Internal Error'
}

var query = function(seriesParams,docClient,callback){
  seriesParams["TableName"] = tableName
  docClient.query(seriesParams, function(err, data) {
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

var series= {
    query:query,
    update:update
  };

module.exports = series;
