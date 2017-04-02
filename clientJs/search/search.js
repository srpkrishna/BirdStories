'use strict';
import React, { Component } from 'react';
import Controller from './searchController';
import  Actions from './searchActions';
import { Provider } from 'react-redux';
import Store from './searchStore';
import SA from '../util/analytics';

class Search extends Component {

  constructor(props){
    super()
    // const obj = Actions.search('');
    // Store.dispatch(obj)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    document.title = window.getString("search") + " -"+window.getString("companyPromo");
    SA.sendPageView('search');
  }

  render() {
    return (
      <Provider store={Store}>
        <Controller />
      </Provider>

    );
  }
}

export default Search;
