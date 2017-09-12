const tableName = "Story"
const error = {
  code:'BS100',
  msg:'Internal Error'
}

var query = function(storyParams,docClient,callback){
  storyParams["TableName"] = tableName
  docClient.query(storyParams, function(err, data) {
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

var stories = {
    query:query,
    scan:scan,
    update:update
  };

module.exports = stories;
