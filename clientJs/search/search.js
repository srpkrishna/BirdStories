'use strict';
import React, { Component } from 'react';
import Controller from './searchController';
import  Actions from './searchActions';
import { Provider } from 'react-redux';
import Store from './searchStore';

class Search extends Component {

  // getStateObject(data){
  //     var value = ''
  //     if(data.location.query){
  //       value = data.location.query
  //     }
  //     const obj = Actions.search(value);
  //     Store.dispatch(obj)
  //
  //     this.state = {value: value};
  // }

  constructor(props){
    super()
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  // componentWillReceiveProps(nextProps){
  //   this.getStateObject(nextProps)
  // }

  handleChange(event) {
    this.setState({value: event.target.value});
    var value = event.target.value.toLowerCase();
    const obj = Actions.search(event.target.value);
    Store.dispatch(obj)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="searchBody">
        <div className="search">
          <input type="text" name="search" placeholder="Search.." className="m-9" value={this.state.value} onChange={this.handleChange}></input>
        </div>
        <Provider store={Store}>
          <Controller />
        </Provider>
      </div>

    );
  }
}

export default Search;
