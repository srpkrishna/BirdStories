var tableName = "Story"

var queryStories = function(storyParams,docClient,callback){
  storyParams["TableName"] = tableName
  console.log("calling db")
  docClient.query(storyParams, function(err, data) {
      if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
          console.log("Query succeeded.");
          data.Items.forEach(function(item) {
              console.log(" -", item);
          });
          callback(data.Items);
      }
  });
}

var update = function(updateParams,docClient,callback){
  updateParams["TableName"] = tableName
  console.log("calling db")

  docClient.update(updateParams, function(err, data) {
      if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
          console.log("Query succeeded."+ data);
          callback(data);
      }
  });
}

var stories = {
    queryStories:queryStories,
    update:update
  };

module.exports = stories;
