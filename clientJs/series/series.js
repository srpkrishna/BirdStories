'use strict';

import React, { Component } from 'react';
import Controller from './seriesController';
import Viewer from './viewerController';
import Store from './seriesStore';
import  Actions from './seriesActions';
import { Provider } from 'react-redux';

class Series extends Component {

  getStateObject(data){
    let state = {
      shdShowViewer:false
    }

    var authorId,id,series,author,name,episode;

    if(data.location.query.a && data.location.query.t && data.location.query.n){
        authorId = data.location.query.a;
        id = data.location.query.t;
        name = data.location.query.n
        episode = data.location.query.e
    }

    if(data.location.state){
      series = data.location.state.series;
      author = data.location.state.author;
    }

    //can't load controller without these values
    if(authorId && id && name){

      var obj = Actions.getSeriesContent(authorId,name,episode);
      Store.dispatch(obj)

      if(series){
        obj = Actions.seriesDetailsSuccess(series);
      }else{
        obj = Actions.getSeriesDetails(authorId,id);
      }

      Store.dispatch(obj);

      if(author){
        obj = Actions.seriesAuthorDetailsSuccess(author);
      }else {
        obj = Actions.getAuthorDetails(authorId)
      }

      Store.dispatch(obj);

      obj = Actions.getComments(authorId,id,episode);
      Store.dispatch(obj);

      state.shdShowViewer = true;

    }else{
      var obj = Actions.fetchSeriesListIfNeeded();
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

export default Series;
