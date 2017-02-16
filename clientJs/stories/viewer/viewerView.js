'use strict';
import React, { Component } from 'react';
import styles from '../../css/viewer.css';
import Body from './body';
import Header from './header';
import Footer from './footer';
import Social from '../../util/social.js';

var c = 0;
var t;
var timer_is_on = 0;
var reachedBottom = false;

class View extends Component {

  constructor(props){
    super(props)
    this.handleScroll = this.handleScroll.bind(this);
    this.stopCount = this.stopCount.bind(this);
    this.startCount = this.startCount.bind(this);

    this.state = {
      c:0,
      timer_is_on:0,
      reachedBottom:false
    };

  }
  componentWillUnmount(){
      this.props.updateSocial("views");
      if( c > this.props.story.time-1 && reachedBottom === true){
        this.props.updateSocial("reads");
      }
      window.removeEventListener("scroll", this.handleScroll);
      window.onblur = undefined;
      window.onfocus = undefined;

      c = 0;
      t = undefined;
      timer_is_on = 0;
      reachedBottom = false;
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    if(this.props.story)
    {
      document.title = this.props.story.name + " -"+window.getString("companyPromo");
    }
    this.timedCount();

    window.addEventListener("scroll", this.handleScroll);
    window.onblur = this.stopCount;
    window.onfocus = this.startCount;
  }

  timedCount() {
    c = c + 1;
    var that = this;
    t = setTimeout(function(){ that.timedCount() }, 1000*60);
  }

  startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        this.timedCount();
    }
  }

  stopCount() {
      clearTimeout(t);
      timer_is_on = 0;
  }


  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight * 0.95) {
      reachedBottom = true;
    }
  }

  render(){
    var content = this.props.content;
    var story = this.props.story;
    var author = this.props.author;
    var authorLink = this.props.authorLink;
    var updateSocial = this.props.updateSocial;
    var tag = []
    if(content && story && author){
      tag.push(<Header story={story} authorLink={authorLink} updateSocial={updateSocial} key={0}/>)
      tag.push(<Body content={content} key={1}/>)
      tag.push(<Footer story={story} authorLink={authorLink}  updateSocial={updateSocial} key={2}/>)
    }

    return(
      <div>
        {tag}
      </div>
    )
  }
}


export default View;
