'use strict';

import Constants from './storiesConstants';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const defaultState = {
  stories: [],
  isFetching:true
};

const reducer = (state, action) => {
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

      default:
        return state;
    }
}

const loggerMiddleware = createLogger()
const store = createStore(
  reducer,
  defaultState,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)
export default store
