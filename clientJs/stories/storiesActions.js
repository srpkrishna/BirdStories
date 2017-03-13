'use strict';
import  Constants from './storiesConstants';
import Server from '../util/server';

function fetchSuccess(stories){

  // if(stories && stories.length > 0){
  //   var dt = new Date()
  //   var index = dt.getDate() % stories.length
  //   var count = 0;
  //   while(count < index){
  //     stories.push(stories.shift())
  //     count++;
  //   }
  // }

  return {
    type:Constants.StoriesChangeEvent,
    isFetching:false,
    stories:stories
  };
}

function shouldFetchStories(state) {
  const stories = state.stories
  if (!state.isFetching) {
    return true;
  } else if (!stories || stories.length == 0) {
    return true;
  } else {
    return stories.didInvalidate;
  }
}

function fetchStoriesIfNeeded() {
  return function(dispatch, getState){
    if (shouldFetchStories(getState())) {
      return dispatch(fetchStories())
    };
  };
}

function fetchStories(){
  return function(dispatch) {
    Server.fetch('stories',function(data){
        dispatch(fetchSuccess(data))
    });
  }
}


function commentsSuccess(data){
  return {
    type:Constants.StoryCommentsSuccess,
    comments:data,
  };
}

function fetchComments(authorId,id){
    return function(dispatch){
      const postId = authorId + id
      Server.fetch('comments/'+postId,function(data){
          if(!data.code){
              dispatch(commentsSuccess(data))
          }
        });
    }
}

function commentPostedSuccessfully(comment){
  return {
    type:Constants.StoryCommentPostSuccess,
    comment:comment,
  };
}


function publishComment(comment){
    return function(dispatch,getState) {
      const story = getState().selectedStory
      const postId = story.author + story.timestamp
      Server.connect('POST','comments/'+postId,comment,function(data){
          if(data.code){
            console.log("error publishing comments")
          }else{
            dispatch(commentPostedSuccessfully(data));
          }

      });
    }
}

function updateSuccess(attributes,element){
  return {
    type:Constants.StoryChangeEvent,
    attributes:attributes,
    element:element
  };
}

function updateSocial(element){

  return function(dispatch,getState) {
    const story = getState().selectedStory

    if(!story){
      return
    }
    const storyId = {
      author:story.author,
      timestamp:story.timestamp
    }

    const body = {
      id:storyId,
      updateAttr:"social",
      updateKey:element
    }
    Server.connect('POST','stories',body,function(data){
        if(!data.code)
          dispatch(updateSuccess(data,element))
    });
  }
}

function contentSuccess(data){
  return {
    type:Constants.StoryContentSuccess,
    content:data,
  };
}

function getStoryContent(authorId,name){
  return function(dispatch) {
    Server.fetch('stories/content/'+authorId+'/'+name,function(data){
        dispatch(contentSuccess(data))
    });
  }
}

function storyDetailsSuccess(data){

  if(!data || !data.timestamp){
    window.location.replace("/")
  }
  return {
    type:Constants.StoryDetailsSuccess,
    story:data,
  };
}

function getStoryDetails(authorId,id){
  return function(dispatch) {
    Server.fetch('stories/story/'+authorId+'/'+id,function(data){
        dispatch(storyDetailsSuccess(data))
    });
  }
}

function storyAuthorDetailsSuccess(data){
  return {
    type:Constants.StoryAuthorDetailsSuccess,
    author:data,
  };
}

function getAuthorDetails(authorId){
  return function(dispatch) {
    Server.fetch('authors/'+authorId,function(data){
        dispatch(storyAuthorDetailsSuccess(data))
    });
  }
}

const Actions = {
    fetchStories:fetchStories,
    fetchStoriesIfNeeded:fetchStoriesIfNeeded,
    getStoryContent:getStoryContent,
    updateSocial:updateSocial,
    getAuthorDetails:getAuthorDetails,
    storyAuthorDetailsSuccess:storyAuthorDetailsSuccess,
    getStoryDetails:getStoryDetails,
    storyDetailsSuccess:storyDetailsSuccess,
    publishComment:publishComment,
    getComments:fetchComments
};

export default Actions
