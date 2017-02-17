'use strict';
import  Constants from './storiesConstants';
import Server from '../util/server';

function fetchSuccess(stories){
  return {
    type:Constants.StoriesChangeEvent,
    isFetching:false,
    stories:stories
  };
}

function updateSuccess(attributes,element){
  return {
    type:Constants.StoryChangeEvent,
    attributes:attributes,
    element:element
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

function updateSocial(element){

  return function(dispatch,getState) {
    const story = getState().selectedStory
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
        //console.log(data);
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
    storyDetailsSuccess:storyDetailsSuccess
};

export default Actions
