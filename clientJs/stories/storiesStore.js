'use strict';

import Constants from './storiesConstants';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware,combineReducers } from 'redux';

const defaultState = {
  stories: [],
  isFetching:false
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
      case Constants.StoriesChangeEvent:
        var newState = Object.assign({}, state);
        newState.isFetching = action.isFetching;
        newState.stories =  action.stories;
        return newState;
      case Constants.MoreStoriesSuccess:
        var newState = Object.assign({}, state);

        if(action.stories && action.stories.length == 0){
          newState.reachedEnd = true;
        }else{
          newState.stories =  newState.stories.concat(action.stories);
        }

        return newState;

      case Constants.StoryChangeEvent:
        var newState = Object.assign({}, state);
        var viewerStory = Object.assign({}, state.selectedStory);
        var selectedStory = Object.assign({}, viewerStory);
        var element = action.element;
        selectedStory.social[element] = action.attributes.social[element]
        newState.selectedStory = selectedStory;

        if(state.stories && state.stories.length > 0){
          let array = state.stories.map((story) => {
              if (story.author === viewerStory.author &&
                    story.timestamp === viewerStory.timestamp) {
                var newStory =  Object.assign({}, story)
                newStory.social[element] = action.attributes.social[element]
                return newStory
              }
              return story
            })

          newState.stories = array;
        }
        return newState;

      case Constants.StoryContentSuccess:
        var newState = Object.assign({}, state);
        newState.selectedContent = action.content;
        return newState;
      case Constants.StoryAuthorDetailsSuccess:
        var newState = Object.assign({}, state);
        newState.selectedAuthor = action.author;
        const link = "/author/"+action.author.penName;
        const linkObj = {
            pathname:link,
            state:action.author
        }
        newState.authorLink = linkObj;
        return newState;
      case Constants.StoryDetailsSuccess:
        var newState = Object.assign({}, state);
        newState.selectedStory = action.story;
        return newState;
      case Constants.StoryCommentsSuccess:
        var newState = Object.assign({}, state);
        newState.selectedStoryComments = action.comments;

        newState.shdShowMoreComments = false
        if(action.comments && action.comments.length % 5 === 0){
          newState.shdShowMoreComments = true
        }

        return newState;
      case Constants.StoryCommentPostSuccess:
        var newState = Object.assign({}, state);

        if(!newState.selectedStoryComments){
          newState.selectedStoryComments = [action.comment]
        }else{
          var comments = Object.assign([], newState.selectedStoryComments);
          comments.splice( 0, 0, action.comment)
          newState.selectedStoryComments = comments
        }
        return newState;
      case Constants.StoryMoreCommentsSuccess:
        var newState = Object.assign({}, state);
        if(action.comments.length > 0){
          var comments = Object.assign([], newState.selectedStoryComments);
          newState.selectedStoryComments = comments.concat(action.comments);
          newState.shdShowMoreComments = false
          if(action.comments.length % 5 == 0){
            newState.shdShowMoreComments = true
          }
          return newState;
        }else {
          newState.shdShowMoreComments = false;
          return newState;
        }

      case Constants.StoryClearSelectedState:

        if(!state.selectedStory){
          return state;
        }

        var newState = Object.assign({}, state);
        newState.selectedStoryComments = undefined;
        newState.selectedStory = undefined;
        newState.selectedAuthor = undefined;
        newState.selectedContent = undefined;
        newState.shdShowMoreComments = false;
        newState.reachedEnd = false;
        return newState;

      case Constants.StoryFiltersSuccess:
        if(action.filters && action.filters.length>0){
          var newState = Object.assign({}, state);
          newState.filters = action.filters
          return newState;
        }
        return state;

      default:
        return state;
    }
}

const middlewares = [thunkMiddleware];// lets us dispatch() functions

if (process.env.NODE_ENV === "dev") {
  const loggerMiddleware = createLogger();// neat middleware that logs actions
  middlewares.push(loggerMiddleware);
}

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
)
export default store
