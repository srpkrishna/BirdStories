'use strict';

import  Constants from './searchConstants';
import Server from '../util/server';

function pendingSearch(){
  return {
    type:Constants.SearchPendingEvent
  };
}

function searchAuthorsSuccess(results){
  return {
    type:Constants.SearchAuthorsChangeEvent,
    results:results
  };
}

function searchStoriesSuccess(results){
  return {
    type:Constants.SearchStoriesChangeEvent,
    results:results
  };
}

// function filterAuthorsSuccess(results){
//   return {
//     type:Constants.FilterAuthorsChangeEvent,
//     results:results
//   };
// }
//
// function filterStoriesSuccess(results){
//   return {
//     type:Constants.FilterStoriesChangeEvent,
//     results:results
//   };
// }

function search(value){
  return function(dispatch,getState) {
    dispatch(pendingSearch())

    if(value.length<2){
      return
    }

    let isHardFetch = true;

    // if(value.length > 2)
    // {
    //   let prevString = getState().searchString;
    //   let diff = prevString.length - value.length
    //   if((diff == 1 || diff == -1) && (prevString.includes(value) || value.includes(prevString)){
    //     isHardFetch = false;
    //   }
    // }

    searchStories(value,dispatch,getState,isHardFetch)
    searchAuthors(value,dispatch,getState,isHardFetch)
  }
}

// function shouldSearchServerForStories(state){
//    if(state.stories.count == 10){
//       return true;
//    }
// }

function searchStories(value,dispatch,getState,shdFetch){

  // const isStorySearchNeeded = shdFetch
  // if(!isStorySearchNeeded)
  // {
  //    isStorySearchNeeded = shouldSearchServerForStories(getState());
  // }
  //
  // if(isStorySearchNeeded)
  // {
    const param = encodeURI(value);
    Server.fetch('stories/search?q='+param,function(data){
        dispatch(searchStoriesSuccess(data));
    });
  // }
}

// function shouldSearchServerForAuthors(state){
//    if(state.authors.count == 10){
//       return true;
//    }
// }

function searchAuthors(value,dispatch,getState,shdFetch){
  // const isAuthorSearchNeeded = shdFetch
  //
  // if(!isAuthorSearchNeeded)
  // {
  //   shouldSearchServerForStories(getState());
  // }

  //if(isAuthorSearchNeeded){
    const param = encodeURI(value);
    Server.fetch('authors/search?q='+param,function(data){
        dispatch(searchAuthorsSuccess(data));
    });
  //}
}

const Actions = {
    search:search
};

export default Actions
