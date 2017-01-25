'use strict';

import Constants from './searchConstants';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const defaultState = {
  stories:[],
  authors:[]
};

const reducer = (state, action) => {
    switch (action.type) {
      case Constants.SearchPendingEvent:
        return defaultState;
      case Constants.SearchStoriesChangeEvent:
        var newState = Object.assign({}, state);
        newState.stories =  action.results;
        return newState;
      case Constants.SearchAuthorsChangeEvent:
        var newState = Object.assign({}, state);
        newState.authors =  action.results;
        return newState;
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
