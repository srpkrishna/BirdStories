const userAnalyticsDB = require('../dbFetch/userAnalyticsDB.js');
const conn = require('../utils/connections.js');
const docClient = conn.getDocClient();

function insertUserPostIdAnalytics(userId,postId,postItem,socialElement,updateSuccess,episode){
  var item = postItem

  //for series
  if(episode){

    if(item){

      var socialobj = item[episode]
      if(socialobj){

        if(socialobj[socialElement]){
          socialobj[socialElement] = socialobj[socialElement] + 1
        }else{
          socialobj[socialElement] = 1
        }

        item[episode] = socialobj

      }else{
        socialobj = {}
        socialobj[socialElement] = 1
        item[episode] = socialobj
      }

    }else{
      item ={
        userId:userId,
        postId:postId
      }
      var socialobj = {}
      socialobj[socialElement] = 1
      item[episode] = socialobj
    }

  }else{
    // for stories
    if(item){
      if(item[socialElement]){
        item[socialElement] = item[socialElement] + 1
      }else{
        item[socialElement] = 1
      }
    }else{
      item ={
        userId:userId,
        postId:postId
      }
      item[socialElement] = 1
    }
  }


  userAnalyticsDB.insert(item,docClient,updateSuccess);
}

function insertUserAnalytics(userId,postId,postItem,genres,socialElement,updateSuccess){
  var item = postItem

  for (index in genres){
    var element = genres[index]
    if(item){
      if(item[element]){
        var socialobj = item[element]

        if(socialobj[socialElement]){
          socialobj[socialElement] = socialobj[socialElement] + 1
        }else{
          socialobj[socialElement] = 1
        }

        item[element] = socialobj
      }else{
        var socialobj = {}
        socialobj[socialElement] = 1
        item[element] = socialobj
      }
    }else{
      item ={
        userId:userId,
        postId:postId
      }

      var socialobj = {}
      socialobj[socialElement] = 1
      item[element] = socialobj
    }
  }
  userAnalyticsDB.insert(item,docClient,updateSuccess);
}

function update(id,post,element,callback){

  var updateSucessCount = 0
  var updateSuccess = function(data){
    updateSucessCount = updateSucessCount + 1

    if(updateSucessCount == 2){
      callback()
    }
  }
  var postId = post.author+post.timestamp;
  var userId = id.user.email;

  updateWithPostId(userId,postId,element,post.genre,updateSuccess,id.episode);
  updateWithPostId(userId,"a0",element,post.genre,updateSuccess);
}

function updateWithPostId(userId,postId,socialElement,genreList,callback,episode){

  var itemSuccess = function(items){
    var item;
    if(items && items.length > 0 ){
      item = items[0]
    }

    if(postId === "a0"){
      insertUserAnalytics(userId,postId,item,genreList,socialElement,callback);
    }else{
      insertUserPostIdAnalytics(userId,postId,item,socialElement,callback,episode);
    }

  }

  var params = {
      KeyConditionExpression: "#userId = :userId and #postId = :postId",
      ExpressionAttributeNames:{
          "#postId": "postId",
          "#userId": "userId"
      },
      ExpressionAttributeValues: {
          ":postId":postId,
          ":userId":userId
      }
  };
  userAnalyticsDB.query(params,docClient,itemSuccess);
}

function getUserStories(userId,callback){
  var params = {
      KeyConditionExpression: "#userId = :userId",
      ExpressionAttributeNames:{
          "#userId": "userId"
      },
      ExpressionAttributeValues: {
          ":userId":userId
      }
  };
  userAnalyticsDB.query(params,docClient,callback);
}

var userAnalyticsUtils = {
    update:update,
    getUserStories:getUserStories
  };

module.exports = userAnalyticsUtils;
