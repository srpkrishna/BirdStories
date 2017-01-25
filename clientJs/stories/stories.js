'use strict';

import React, { Component } from 'react';
import Controller from './storiesController';
import Store from './storiesStore';
import  Actions from './storiesActions';
import { Provider } from 'react-redux';

class Stories extends Component {

  constructor(){
    super()
    var obj = Actions.fetchStories();
    Store.dispatch(obj)
  }
  render(){
    return(
      <Provider store={Store}>
        <Controller />
      </Provider>
    );
  }

}

export default Stories;
