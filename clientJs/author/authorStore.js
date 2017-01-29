'use strict';

import Constants from './authorConstants';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const defaultState = {
  author:{},
  stories:[]
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
      case Constants.AuthorStoriesFetch:
        var newState = Object.assign({}, state);
        newState.stories =  action.stories;
        return newState;
      case Constants.AuthorDetailsFetch:
        var newState = Object.assign({}, state);
        newState.author =  action.author;
        return newState;
      default:
        return state;
    }
}

const loggerMiddleware = createLogger()
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

export default store
