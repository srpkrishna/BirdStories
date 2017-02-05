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

      case Constants.StoryChangeEvent:
        var newState = Object.assign({}, state);
        var viewerStory = Object.assign({}, state.selectedStory);
        var selectedStory = Object.assign({}, viewerStory, {
          social: action.attributes.social,
          score: action.attributes.score
        })

        newState.selectedStory = selectedStory
        if(state.stories && state.stories.length > 0){
          let array = state.stories.map((story) => {
              if (story.author === viewerStory.author &&
                    story.timestamp === viewerStory.timestamp) {
                return Object.assign({}, story, {
                  social: action.attributes.social,
                  score: action.attributes.score
                })
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
      default:
        return state;
    }
}

const middlewares = [thunkMiddleware];// lets us dispatch() functions

if (process.env.NODE_ENV !== "production") {
  const loggerMiddleware = createLogger();// neat middleware that logs actions
  middlewares.push(loggerMiddleware);
}

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
)
export default store
