'use strict';
import React, { Component } from 'react';
import Controller from './searchController';
import styles from '../css/search.css';
import  Actions from './searchActions';
import { Provider } from 'react-redux';
import Store from './searchStore';

class Search extends Component {

  constructor(props){
    super()
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    const obj = Actions.search(event.target.value);
    Store.dispatch(obj)
  }

  render() {
    return (
      <div className="search">
        <input type="text" name="search" placeholder="Search.." className="m-9" value={this.state.value} onChange={this.handleChange}></input>
        <Provider store={Store}>
          <Controller />
        </Provider>
      </div>
    );
  }
}

export default Search;
