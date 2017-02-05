import React, { Component } from 'react';
import  Actions from './authorActions';
import { Provider } from 'react-redux';
import Store from './authorStore';
import Controller from './authorController';

class Author extends Component {

  getStateObject(data){
    let state = {
      authorId:data.params.authorId
    }

    if(data.location.state){
      state.author = data.location.state;
    }

    return state;
  }

  constructor(props){
    super(props)
    this.state = this.getStateObject(props)

    if(this.state.author){
      var obj = Actions.authorDetailsSuccess(this.state.author);
      Store.dispatch(obj)
    }else{
      var obj = Actions.getAuthorDetails(this.state.authorId);
      Store.dispatch(obj)
    }

    var obj = Actions.getAuthorStories(this.state.authorId);
    Store.dispatch(obj)

  }
  componentWillReceiveProps(nextProps){
    this.state = this.getStateObject(nextProps)
  }

  render() {
    return (
      <Provider store={Store}>
        <Controller />
      </Provider>
    );
  }
}

export default Author;
