'use strict';
import React, { Component } from 'react';
import styles from '../css/viewer.css';
import Body from './body';
import Header from './header';
import Footer from './footer';
import EpisodeStrip from './episodeStrip';
import Comments from './comments';
import SA from '../util/analytics';

var c = 0;
var t;
var timer_is_on = 0;
var reachedBottom = false;
var markedAsView = false;
var markedAsRead = false;

class View extends Component {

  constructor(props){
    super(props)
    this.handleScroll = this.handleScroll.bind(this);
    this.stopCount = this.stopCount.bind(this);
    this.startCount = this.startCount.bind(this);

  }
  componentWillUnmount(){
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

      var name = "";

      if(this.props.story && this.props.story.name)
        name = this.props.story.name.removeSpaceAndCapitals();

      SA.sendEvent('Story','close',name);
  }

  componentWillReceiveProps(nextProps){
      if(this.props.episode && nextProps.episode && this.props.episode != nextProps.episode){
        c = 0;
        t = undefined;
        timer_is_on = 0;
        reachedBottom = false;
        markedAsView = false;
        markedAsRead = false;

        window.scrollTo(0, 0);
        this.timedCount();
        this.storyLoaded();
      }
  }

  markAsRead(){
    if( this.props.story && c > this.props.story.time*0.75 && reachedBottom === true && !markedAsRead){
      this.props.updateSocial("reads");
      var name = this.props.story.name.removeSpaceAndCapitals();
      SA.sendEvent('Story','read',name);
      markedAsRead = true;
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

  componentDidMount() {
    window.scrollTo(0, 0);
    this.timedCount();

    window.addEventListener("scroll", this.handleScroll);
    window.onblur = this.stopCount;
    window.onfocus = this.startCount;
  }

  timedCount() {
    var name = "";
    if(this.props.story && this.props.story.name && c > 0){
      name = this.props.story.name.removeSpaceAndCapitals();
      SA.sendEvent('Story','reading',name,c);
    }

    if( this.props.story && c > this.props.story.time*0.75){
      this.markAsRead()
    }else{
      var that = this;
      t = setTimeout(function(){ that.timedCount() }, 1000*60);
    }
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
    if (windowBottom >= docHeight * 0.7 && !reachedBottom) {
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
        tag.push(<div className="episodeTitle">{title}</div> )
      }
      tag.push(<Body content={content} key={1}/>)
      if(story.episodes){
        tag.splice(1,0,<EpisodeStrip key={-1} series={story} episode={this.props.episode} author={this.props.author} />)
        tag.push(<EpisodeStrip key={2} series={story} episode={this.props.episode} author={this.props.author} />)
      }
      tag.push(<Footer story={story} authorLink={authorLink}  updateSocial={updateSocial} publishComment={publishComment} key={3}/>)

      if(comments && comments.length > 0){
        tag.push(<Comments comments={comments} key={4} publishComment={publishComment} showMoreComments={this.props.showMoreComments} title={window.getString("commentText")} />)
      }

      if(!markedAsView)
        this.storyLoaded()
    }

    return(
      <div>
        {tag}
      </div>
    )
  }
}


export default View;
