'use strict';
import React, { Component } from 'react';
import  StoryItem from '../stories/storyItemView';
import  SeriesItem from '../series/seriesItemView';
import Styles from '../css/author.css';
import SA from '../util/analytics';

class View extends Component {

  constructor(props){
    super(props)
  }

  componentWillUnmount(){

    var name = "";

    if(this.props.author && this.props.author.penName)
      name = this.props.author.penName;

    SA.sendEvent('Author','close',name);
    window.onbeforeunload = undefined;
  }

  render(){

    var stories = this.props.stories;
    var author = this.props.author;
    var series = this.props.series;
    var storyDiv = '';
    var authorDiv = '';
    var seriesDiv = '';

    if(stories && stories.length > 0){
      storyDiv = <div className="block stories">
        <div className="sideHeader">{window.getString('stories')}:</div>
        {
          stories.map(function(story,i) {
            return <StoryItem story={story} author={author} key={i} index={i} />;
          })
        }
      </div>
    }

    if(series && series.length > 0){
      seriesDiv = <div className="block series">
        <div className="sideHeader">{window.getString('series')}:</div>
        {
          series.map(function(story,i) {
            return <SeriesItem series={story} author={author} key={i} index={i} />;
          })
        }
      </div>
    }


    if(author && author.penName){

      if( 0 > document.title.indexOf(author.penName)){
        document.title = author.penName + " -"+window.getString("companyPromo");
        SA.sendPageView(author.penName);
        window.onbeforeunload = () => {
            var name = this.props.story.name.removeSpaceAndCapitals();
            SA.sendEvent('Author','close',author.penName);
          }
      }

      var imgSrc = "https://s3.ap-south-1.amazonaws.com/bsstory/"+author.penName+"/profile.jpg"
      const imageStyle = {
        background: 'url(' + imgSrc + ') no-repeat center',
        backgroundSize:'cover'
      }

      var intro = author.profile.intro
      if(!intro){
        intro = ""
      }

      authorDiv = <div className="authorProfile" >
        <div className="authorImage a2" style={imageStyle}></div>
        <ul>
          <li>{author.profile.fullName}</li>
          <li>{author.profile.qual}</li>
          <li>{author.profile.prof}</li>
        </ul>
        <p>{intro} </p>
        {storyDiv}
        {seriesDiv}
      </div>
    }
    return(
      <div>
        {authorDiv}
      </div>
    )
  }
}

export default View;
