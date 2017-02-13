import React, { Component } from 'react';

class Write extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  
  render() {
    return (
      <div>
        <h2>Write</h2>
      </div>
    );
  }
}

Write.defaultProps = {requireAuth:true}
export default Write;
