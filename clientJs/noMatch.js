import React, { Component } from 'react';
import { Link } from 'react-router';

const pink = {
  color:"#d12767"
}

const center = {
  padding:"10%",
  textAlign:"center"
}

class NoMatch extends Component {
  render() {
    return (
      <h3 style={center}> No Page found. Click to <Link to="/" style={pink}>Home</Link></h3>
    );
  }
}

export default NoMatch;
