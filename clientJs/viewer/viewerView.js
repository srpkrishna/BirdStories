'use strict';
import React, { Component } from 'react';
import styles from '../css/viewer.css';
import Body from './body';
import Header from './header';
import Footer from './footer';
import EpisodeStrip from './episodeStrip';
import Comments from './comments';
import SA from '../util/analytics';
import Loader from '../util/loading';

var shdDisableEvents = false;

var c = 0;
var t;
var timer_is_on = 0;
var reachedBottom = false;
var markedAsView = false;
var markedAsRead = false;

class View extends Component {

  constructor(props){
    super(props)

    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    var isOperaMini = ua.indexOf("opera mini") > -1;

    if(isAndroid && isOperaMini){
      shdDisableEvents = true
    }


    this.handleScroll = this.handleScroll.bind(this);
    this.stopCount = this.stopCount.bind(this);
    this.startCount = this.startCount.bind(this);

  }
  componentWillUnmount(){


      if(!shdDisableEvents){
        window.removeEventListener("scroll", this.handleScroll);
        window.onblur = undefined;
        window.onfocus = undefined;
        window.onbeforeunload = undefined;

        c = 0;
        t = undefined;
        timer_is_on = 0;
        reachedBottom = false;
        markedAsView = false;
        markedAsRead = false;
      }

      var name = "";

      if(this.props.story && this.props.story.name)
        name = this.props.story.name.removeSpaceAndCapitals();

      SA.sendEvent('Story','close',name);
  }

  componentWillReceiveProps(nextProps){
      if(this.props.episode && nextProps.episode && this.props.episode != nextProps.episode){
        window.scrollTo(0, 0);

        if(!shdDisableEvents){
          c = 0;
          t = undefined;
          timer_is_on = 0;
          reachedBottom = false;
          markedAsView = false;
          markedAsRead = false;
          this.timedCount();
        }

        this.storyLoaded();
      }
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    if(!shdDisableEvents){
      this.timedCount();

      window.addEventListener("scroll", this.handleScroll);
      window.onblur = this.stopCount;
      window.onfocus = this.startCount;
    }

  }

  markAsRead(){
    if( reachedBottom && markedAsRead){
      this.props.updateSocial("reads");
      var name = this.props.story.name.removeSpaceAndCapitals();
      SA.sendEvent('Story','read',name);
    }
  }

  markAsView(){
    this.props.updateSocial("views");
    var name = this.props.story.name.removeSpaceAndCapitals();

    if(this.props.story.episodes){
      var title = ""
      var episodes = this.props.story.episodes
      if(episodes.length >= Number(this.props.episode)){
        var episode = Number(this.props.episode) - 1
        title = episodes[episode]
      }

      name = name +"-"+ title;
      SA.sendPageView(this.props.story.name,name,'Series');
    }else {

      SA.sendPageView(this.props.story.name,name,'Story');

    }
  }

  timedCount() {
    var name = "";
    var story = this.props.story;

    if(story){
      if( story.name && c > 0){
        name = story.name.removeSpaceAndCapitals();
        SA.sendEvent('Story','reading',name,c);
      }
      var time = 10
      if(story.time){
        time = story.time
      }else if(story.episodeTimes && this.props.episode && story.episodeTimes.length >= Number(this.props.episode) ){
        var episode = Number(this.props.episode) - 1
        time = story.episodeTimes[episode]
      }

      if(c > time*0.75){
        markedAsRead = true;
        this.markAsRead();
        return
      }
    }

    var that = this;
    t = setTimeout(function(){ that.timedCount() }, 1000*60);
    c = c + 1;
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

  storyLoaded(){
    this.markAsView()
    document.title = this.props.story.name + " -"+window.getString("companyPromo");
    window.onbeforeunload = () => {
        var name = this.props.story.name.removeSpaceAndCapitals();
        SA.sendEvent('Story','close',name);
      }
    markedAsView = true;
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight * 0.65 && !reachedBottom) {
      reachedBottom = true;
      this.markAsRead()
    }
  }

  render(){
    var content = this.props.content;
    var story = this.props.story;
    var author = this.props.author;
    var authorLink = this.props.authorLink;
    var updateSocial = this.props.updateSocial;
    var publishComment = this.props.publishComment;
    var comments = this.props.comments;

    var tag = []
    if(content && story && author){
      tag.push(<Header story={story} authorLink={authorLink} updateSocial={updateSocial} key={0}/>)
      if(story.episodes && story.episodes.length >= Number(this.props.episode)){
        var episode = Number(this.props.episode) - 1
        var title = story.episodes[episode]
        tag.push(<div key={1} className="episodeTitle">{title}</div> )
      }
      tag.push(<Body content={content} key={2}/>)
      if(story.episodes){
        tag.splice(1,0,<EpisodeStrip key={3} series={story} episode={this.props.episode} author={this.props.author} />)
        tag.push(<EpisodeStrip key={4} series={story} episode={this.props.episode} author={this.props.author} />)
      }
      tag.push(<Footer story={story} authorLink={authorLink}  updateSocial={updateSocial} publishComment={publishComment} key={5}/>)

      if(comments && comments.length > 0){
        tag.push(<Comments comments={comments} key={6} publishComment={publishComment} showMoreComments={this.props.showMoreComments} title={window.getString("commentText")} />)
      }

      if(!markedAsView)
        this.storyLoaded()

    }else{
      tag.push(<Loader key={0}/>)
    }

    return(
      <div>
        {tag}
      </div>
    )
  }
}


export default View;
