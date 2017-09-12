'use strict';

import React, { Component } from 'react';
import Controller from './storiesController';
import Viewer from './viewerController';
import Store from './storiesStore';
import  Actions from './storiesActions';
import { Provider } from 'react-redux';

class Stories extends Component {

  getStateObject(data){
    let state = {
      shdShowViewer:false
    }

    var authorId,id,story,author,name;

    if(data.location.query.a && data.location.query.t && data.location.query.n){
        authorId = data.location.query.a;
        id = data.location.query.t;
        name = data.location.query.n
    }

    if(data.location.state){
      story = data.location.state.story;
      author = data.location.state.author;
    }

    //can't load controller without these values
    if(authorId && id && name){


      var obj = Actions.clearSelectedState();
      Store.dispatch(obj)

      obj = Actions.getStoryContent(authorId,name);
      Store.dispatch(obj)

      if(story){
        obj = Actions.storyDetailsSuccess(story);
      }else{
        obj = Actions.getStoryDetails(authorId,id);
      }

      Store.dispatch(obj);

      if(author){
        obj = Actions.storyAuthorDetailsSuccess(author);
      }else {
        obj = Actions.getAuthorDetails(authorId)
      }

      Store.dispatch(obj);

      if(story){
        obj = Actions.getComments(story.author,story.timestamp);
      }else {
        obj = Actions.getComments(authorId,id);
      }
      Store.dispatch(obj);

      state.shdShowViewer = true;

    }else{
      var obj = Actions.fetchStoriesIfNeeded();
      Store.dispatch(obj)
      document.title = window.getString("docTitle");
    }

    return state;
  }
  constructor(props){
    super(props)
    this.state = this.getStateObject(props)

  }
  componentWillReceiveProps(nextProps){
    this.state = this.getStateObject(nextProps)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render(){

    let tag = <Controller />
    if(this.state.shdShowViewer){
        tag = <Viewer />
    }
    return(
      <Provider store={Store} >
        {tag}
      </Provider>
    );
  }

}

export default Stories;
