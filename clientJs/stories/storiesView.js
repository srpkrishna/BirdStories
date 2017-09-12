'use strict';

import React,{Component} from 'react';
import  StoryItem from './storyItemView';
import styles from '../css/stories.css';
import Loader from '../util/loading';

var timeoutStories = null;

class View extends Component {
  constructor(props){
    super(props)
    this.handleScroll = this.handleScroll.bind(this);
  }

  // this method is dependent on css
  handleScroll() {

    var element = document.getElementsByClassName("homeStories")[0]
    if(element && 0 === element.clientHeight){
      return;
    }

    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight * 0.92 && !this.props.reachedEnd) {
      clearTimeout(timeoutStories);
      var that = this;
      timeoutStories = setTimeout(function(){
          that.props.showMoreStories()
      },600);
    }
  }

  componentWillUnmount(){
      window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidMount(){
      window.addEventListener("scroll", this.handleScroll);
  }


  render(){
    var storyDivs = '';
    if(this.props.stories){
      storyDivs = this.props.stories.map(function(story,i) {
        return <StoryItem story={story} key={i} index={i} />;
      })
    }

    var loaderDiv = ''
    if(!this.props.reachedEnd){
       loaderDiv = <Loader />
    }

    return (
      <div className="stories">
        {storyDivs}
        {loaderDiv}
      </div>
    )
  }

}


export default View;
