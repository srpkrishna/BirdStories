'use strict';

import Constants from './seriesConstants';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware,combineReducers } from 'redux';

const defaultState = {
  seriesList: [],
  isFetching:false
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
      case Constants.SeriesListChangeEvent:
        var newState = Object.assign({}, state);
        newState.isFetching = action.isFetching;
        newState.seriesList =  action.seriesList;
        return newState;
      case Constants.MoreSeriesSuccess:
        var newState = Object.assign({}, state);


        if(action.seriesList && action.seriesList.length == 0){
          newState.reachedEnd = true;
        }else{
          newState.seriesList =  newState.seriesList.concat(action.seriesList);
        }
        return newState;

      case Constants.SeriesChangeEvent:
        var newState = Object.assign({}, state);
        var viewerSeries = Object.assign({}, state.selectedSeries);
        var selectedSeries = Object.assign({}, viewerSeries);
        var element = action.element;
        selectedSeries.social[element] = action.attributes.social[element]
        newState.selectedSeries = selectedSeries;

        if(state.seriesList && state.seriesList.length > 0){
          let array = state.seriesList.map((series) => {
              if (series.author === viewerSeries.author &&
                    series.timestamp === viewerSeries.timestamp) {
                var newSeries =  Object.assign({}, series)
                newSeries.social[element] = action.attributes.social[element]
                return newSeries
              }
              return series
            })

          newState.seriesList = array;
        }
        return newState;

      case Constants.SeriesContentSuccess:
        var newState = Object.assign({}, state);
        newState.selectedContent = action.content;
        newState.selectedEpisode = action.episode
        return newState;
      case Constants.SeriesAuthorDetailsSuccess:
        var newState = Object.assign({}, state);
        newState.selectedAuthor = action.author;
        const link = "/author/"+action.author.penName;
        const linkObj = {
            pathname:link,
            state:action.author
        }
        newState.authorLink = linkObj;
        return newState;
      case Constants.SeriesDetailsSuccess:
        var newState = Object.assign({}, state);
        newState.selectedSeries = action.series;
        return newState;
      case Constants.SeriesCommentsSuccess:
        var newState = Object.assign({}, state);
        newState.selectedSeriesComments = action.comments;
        return newState;
      case Constants.SeriesCommentPostSuccess:
        var newState = Object.assign({}, state);

        if(!newState.selectedSeriesComments){
          newState.selectedSeriesComments = [action.comment]
        }else{
          var comments = Object.assign([], newState.selectedSeriesComments);
          comments.splice( 0, 0, action.comment)
          newState.selectedSeriesComments = comments
        }
        return newState;
      case Constants.SeriesMoreCommentsSuccess:
        var newState = Object.assign({}, state);

        if(!newState.selectedSeriesComments){
          newState.selectedSeriesComments = [action.comment]
        }else{
          var comments = Object.assign([], newState.selectedSeriesComments);
          newState.selectedSeriesComments = comments.concat(action.comments)
        }
        return newState;

      case Constants.SeriesClearSelectedState:

        if(!state.selectedSeries){
          return state;
        }

        var newState = Object.assign({}, state);
        newState.selectedSeriesComments = undefined;
        newState.selectedSeries = undefined;
        newState.selectedAuthor = undefined;
        newState.selectedContent = undefined;
        newState.selectedEpisode = undefined;
        return newState;


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
