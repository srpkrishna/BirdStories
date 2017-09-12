'use strict';
import React, { Component } from 'react';
import styles from '../css/loading.css';

class View extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="loading">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
        <div className="circle4"></div>
      </div>
    )
  }

}

export default View;
