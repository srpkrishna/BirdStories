'use strict';
import React, { Component } from 'react';
import styles from '../../css/viewer.css';
import Body from './body';
import Header from './header';
import Footer from './footer';
import Social from '../../util/social.js';

class View extends Component {

  componentWillUnmount(){
      this.props.updateSocial("views");
  }

  componentDidMount() {
    window.scrollTo(0, 0)
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
