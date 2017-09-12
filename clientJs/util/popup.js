'use strict';
import React, { Component } from 'react';
import styles from '../css/popup.css';

class View extends Component {

  constructor(props){
    super(props)
    this.state = {content:this.props.content}
    this.closePopup = this.closePopup.bind(this);
    this.dummyClose = this.dummyClose.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({content:nextProps.content})
  }

  closePopup(){
    if(this.props.onClose){
      this.props.onClose()
    }
  }

  dummyClose(event){
    event.stopPropagation();
  }

  render(){

    var content = this.state.content
    if(!content){
      content = <div className="loader" />
    }
    return (
      <div className="popup" onClick={this.closePopup} >
        <div className="content" onClick={this.dummyClose}>
        <button className="closemark" onClick={this.closePopup}>✖</button>
          {content}
        </div>
      </div>
    )
  }

}

export default View;
