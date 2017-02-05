'use strict';
import React, { Component } from 'react';
import Styles from './login.css'

class Login extends Component{

  getStateObject(props){

    var state ={
      isGActive:false,
      isFActive:false
    }
    if(props.google){
      state.isGActive = true;
    }

    if(props.fb){
      state.isFbActive = true;
    }
    return state;
  }

  constructor(props){
     super(props)
     this.state = this.getStateObject(props);
  }

  componentWillReceiveProps(nextProps){
    this.state = this.getStateObject(nextProps)
  }

  render () {
    var gClick = undefined
    var gStyle = undefined
    var fbClick = undefined
    var fbStyle = undefined

    var style = {
          background: 'none repeat scroll 0 0 #ccc'
      }

    if(this.state.isGActive){
        gClick = this.props.google.signIn
    }else{
      gStyle = style
    }

    if(this.state.isFbActive){
      fbClick = this.props.fb.signIn
    }else{
      fbStyle = style
    }


    return (
      <div>
        <ul className="login a3"><div>Please login to proceed</div></ul>
        <ul className="login a3">
          <li id="GBtn" onClick={gClick} style={gStyle}>
    			   <span className="icon"></span>
    			    <span className="buttonText">Google</span>
    			</li>

          <li id="fbBtn" onClick={fbClick} style={fbStyle}>
    			   <span className="icon"></span>
    			    <span className="buttonText">Facebook</span>
    			</li>
        </ul>
      </div>
    );
  }

}

export default Login;
