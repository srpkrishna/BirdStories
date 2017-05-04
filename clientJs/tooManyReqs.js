import React, { Component } from 'react';

const pink = {
  color:"#d12767"
}

const center = {
  padding:"10%",
  textAlign:"center"
}

class TooManyReqs extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <h3 style={center}>Your ip is temporarily blocked. Contact storyboard@sukatha.com</h3>
    );
  }
}

export default TooManyReqs;
