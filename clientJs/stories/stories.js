'use strict';

import React, { Component } from 'react';
import Controller from './storiesController';
import StoriesStore from './storiesStore';
import  Actions from './storiesActions';
import { Provider } from 'react-redux';

class Stories extends Component {

  constructor(){
    super()
    var obj = Actions.fetchStories();
    StoriesStore.dispatch(obj)
  }
  render(){
    return(
      <Provider store={StoriesStore}>
        <Controller />
      </Provider>
    );
  }

}

export default Stories;
