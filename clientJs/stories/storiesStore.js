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
        let array = state.stories.map((story, index) => {
            if (index === action.index) {
              return Object.assign({}, story, {
                social: action.attributes.social,
                score: action.attributes.score
              })
            }
            return story
          })

        return {
          isFetching:state.isFetching,
          stories:array
        }
      case Constants.StoryContentSuccess:
        var newState = Object.assign({}, state);
        newState.selectedContent = action.content;
        return newState;
      case Constants.StoryAuthorDetailsSuccess:
        var newState = Object.assign({}, state);
        newState.selectedAuthor = action.author;
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
