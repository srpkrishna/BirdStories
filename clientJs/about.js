import React, { Component } from 'react';
import Styles from './css/about.css';

class About extends Component {

  componentDidMount(){
    setTimeout(function(){ $(".about .block .a").css({'opacity':'1.0'})}, 10);
    setTimeout(function(){ $(".about .block .b").css({'opacity':'1.0'})}, 2000);
    setTimeout(function(){ $(".about .block .c").css({'opacity':'1.0'})}, 4000);
    setTimeout(function(){ $(".about .d").css({'opacity':'1.0'})}, 6000);
    setTimeout(function(){ $(".about .e").css({'opacity':'1.0'})}, 6000);
    setTimeout(function(){ $(".about .f").css({'opacity':'1.0'})}, 6000);
    setTimeout(function(){ $(".about .g").css({'opacity':'1.0'})}, 6000);
  }


  render() {
    return (
      <div className="about">
        <div className="block quote" >
          <p className="a">{window.getString("quote1")}<span>{window.getString("auth1")}</span></p>
          <p className="b">{window.getString("quote2")}<span>{window.getString("auth2")}</span></p>
          <p className="c">{window.getString("quote3")}<span>{window.getString("auth3")}</span></p>
        </div>
        <div className="block idea d">
          <span>{window.getString("ideaTag")}</span>
          {window.getString("idea")}
          <span>{window.getString("companyCaps")}</span>
          </div>
        <div className="block e">
          <div className="header">{window.getString("vision")}</div>
          <p>{window.getString("visionInfo")}</p>
        </div>
        <div className="block f">
          <div className="header">{window.getString("whoAreWe")}</div>
          <p>{window.getString("whoAreWeInfo")}</p>
        </div>
        <div className="block g">
          <div className="header">{window.getString("whatDoWeDo")}</div>
          <p>{window.getString("whatDoWeDoInfo")}</p>
        </div>
      </div>
    );
  }
}

export default About;
