'use strict';

import React, { Component } from 'react';
import SA from '../util/analytics';
import { Link } from 'react-router';
import Stories from '../stories/stories';
import Series from '../series/series';
import styles from '../css/home.css';

class Home extends Component {

  constructor(props){
    super(props)
    this.state = { imageStatus: false,index:0 };
    this.changeTab =  this.changeTab.bind(this);
  }

  handleImageErrored() {
    this.setState({ imageStatus:false });
  }

  componentWillUnmount(){
    SA.sendEvent('Home','close','home');
    window.onbeforeunload = undefined;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    SA.sendPageView('home');
    window.onbeforeunload = () => {
        SA.sendEvent('Home','close','home');
      }
  }

  changeTab(index){
    this.setState((prevState, props) => {
        var state = prevState;
        prevState.index = index;
        return state;
    })
  }

  render(){

    var img = <Link to="/competition"> <div className="adImage">సు‘కథ’ నిర్వహించే వినూత్నమైన కథల పోటీలో పాల్గొని మీ ప్రతిభకి తగిన గుర్తింపు పొందండి. వివరాలకు ఇక్కడ క్లిక్ చేయండి. <img src="touch.png" className="adIcon"></img></div></Link>

    if(!this.state.imageStatus){
      img = ""
    }


    var storiesDivison = <div className="homeStories"><Stories location={this.props.location}/></div>
    if(this.state.index == 1){
      storiesDivison = <div className="homeStories mobileHide"><Stories location={this.props.location}/></div>
    }

    var seriesDivison = <div className="homeSeries"><Series location={this.props.location}/></div>
    if(this.state.index == 0){
      seriesDivison = <div className="homeSeries mobileHide"><Series className="mobileHide" location={this.props.location}/></div>
    }


    var storiesBtn = <button onClick={()=>this.changeTab(0)}> {window.getString("stories")}</button>
    if(this.state.index == 0){
      storiesBtn = <button className="highlight" onClick={()=> this.changeTab(0)}> {window.getString("stories")}</button>
    }

    var seriesBtn = <button onClick={()=>this.changeTab(1)}> {window.getString("series")}</button>
    if(this.state.index == 1){
      seriesBtn = <button className="highlight" onClick={()=>this.changeTab(1)}> {window.getString("series")}</button>
    }

    return(
      <div>
        {img}
        <div className="tab">
          {storiesBtn}
          {seriesBtn}
        </div>
        {storiesDivison}
        {seriesDivison}
      </div>
    );
  }

}

export default Home;
