import React, { Component } from 'react';
import styles from '../css/search.css';

class Search extends Component {
  render() {
    return (
      <div className="search">
        <input type="text" name="search" placeholder="Search.." className="m-9"></input>
      </div>
    );
  }
}

export default Search;
