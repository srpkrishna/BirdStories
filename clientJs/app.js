import React, { Component } from 'react';
import logo from './img/logo.svg';
import styles from './css/app.css';
import { Link } from 'react-router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Feelings</h2>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
