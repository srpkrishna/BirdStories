'use strict';
import  Constants from './authorConstants';
import Server from '../util/server';

function authorDetailsSuccess(data){
  return {
    type:Constants.AuthorDetailsFetch,
    author:data
  }
}

function authorStoriesSuccess(data){
  return{
    type:Constants.AuthorStoriesFetch,
    stories:data
  }
}

function getAuthorDetails(authorId){
    return function(dispatch){
      Server.fetch('authors/'+authorId,function(data){
          dispatch(authorDetailsSuccess(data));
      });
    }
}

function getAuthorStories(authorId){
  return function(dispatch){
    Server.fetch('stories/'+authorId,function(data){
        dispatch(authorStoriesSuccess(data));
    });
  }
}

const Actions = {
    getAuthorDetails:getAuthorDetails,
    getAuthorStories:getAuthorStories,
    authorDetailsSuccess:authorDetailsSuccess
};

export default Actions
