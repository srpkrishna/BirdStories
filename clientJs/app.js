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
          <Link className="App-logo" to="/">Bird
            <span>Stories</span>
          </Link>
          <ul className="App-menu">
            <li>
              <Link to="/search" activeClassName="active" ><i className="material-icons">search</i>Search</Link>
            </li>
            <li>
              <Link to="/write" activeClassName="active" ><i className="material-icons">create</i>Write</Link>
            </li>
            <li>
              <Link to="/contact" activeClassName="active" ><i className="material-icons">phone</i>Contact</Link>
            </li>
            <li>
              <Link to="/about" activeClassName="active" ><i className="material-icons">info</i>About</Link>
            </li>
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
