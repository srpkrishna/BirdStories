import React, { Component } from 'react';
import Styles from './css/launch.css';

class Launch extends Component {

  componentDidMount(){
    setTimeout(function(){ $(".launch .block .a").css({'opacity':'1.0'})}, 1000);
    //setTimeout(function(){ $(".launch .block .b").css({'opacity':'1.0'})}, 2000);
    setTimeout(function(){ $(".launch .block .c").css({'opacity':'1.0','top':'1rem'})}, 3000);

    setTimeout(function(){ $(".launch .block.remove").css({'opacity':'0.0'})}, 6000);
    setTimeout(function(){ $(".launch .block.remove").css({'display':'none'})}, 6500);
    setTimeout(function(){ $(".launch .d").css({'opacity':'1.0'})}, 6600);
    setTimeout(function(){ $(".launch .block .e").css({'opacity':'1.0'})}, 7500);

    setTimeout(function(){ $(".launch .d").css({'display':'none'})}, 12000);
    setTimeout(function(){ $(".launch .block.remove").css({'display':'block'})}, 12100);
    setTimeout(function(){ $(".launch .block.remove").css({'opacity':'1.0'})}, 12200);
    setTimeout(function(){ $(".launch .f").css({'opacity':'1.0'})}, 13400);
    setTimeout(function(){ $(".launch .quote .g").css({'opacity':'1.0'})}, 13400);
  }
// <span className="b">.com</span>

  render() {
    return (
      <div className="launch">

        <div className="block remove">
          <span className="a">Su</span>
          Katha
          <div className="quote c" >a beautiful story</div>
        </div>
        <div className="block d">Coming soon <span className="e">...</span></div>
        <div className="quote f">For details contact us at <span className="g">storyboard@sukatha.com</span></div>
      </div>
    );
  }
}

export default Launch;
