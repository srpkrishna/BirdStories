'use strict';

import Constants from './profileConstants';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const defaultState = {
  author:{},
  stories:[]
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
      case Constants.MyDetailsFetch:
        var newState = Object.assign({}, state);
        newState.author =  action.myData.author;
        newState.stories = action.myData.stories;
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
