import React, { Component } from 'react';
// import logo from './img/logo.svg';
          /*<img src={logo} className="App-logo" alt="logo" />*/
import styles from './css/app.css';
import { Link } from 'react-router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <a className="App-logo">Bird
            <span>Stories</span>
          </a>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
