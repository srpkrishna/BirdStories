'use strict';

import React, { Component } from 'react';
import Controller from './storiesController';
import Viewer from './viewer/viewerController';
import Store from './storiesStore';
import  Actions from './storiesActions';
import { Provider } from 'react-redux';


class Stories extends Component {

  getStateObject(data){
    let state = {
      shdShowViewer:false
    }
    if(data.author && data.name){
        state.shdShowViewer = true;
        state.author = data.author;
        state.id = data.name;
    }

    if(data.location.state){
      const story = data.location.state.selected
      state.shdShowViewer = true;
      state.author = story.author;
      state.id = story.name;
      state.story = story;
    }

    if(state.shdShowViewer){
      var obj = Actions.getStoryContent();
      Store.dispatch(obj)
    }else{
      var obj = Actions.fetchStoriesIfNeeded();
      Store.dispatch(obj)
    }

    return state;
  }
  locationChange(){
    console.log(location.pathname);
  }
  constructor(props){
    super(props)
    this.state = this.getStateObject(props)

  }
  componentWillReceiveProps(nextProps){
    this.state = this.getStateObject(nextProps)
  }

  render(){

    let tag = <Controller />
    if(this.state.shdShowViewer){
        tag = <Viewer story={this.state.story}/>
    }
    return(
      <Provider store={Store} >
        {tag}
      </Provider>
    );
  }

}

export default Stories;
