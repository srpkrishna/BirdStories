'use strict';

import Constants from './searchConstants';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const defaultState = {
  stories:[],
  authors:[]
};

const reducer = (state=defaultState, action) => {
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
