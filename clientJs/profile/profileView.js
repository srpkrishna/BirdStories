'use strict';
import React, { Component } from 'react';
import Styles from './profile.css';
import StoryTile from './storyListView.js';
import SA from '../util/analytics';

class View extends Component {

  constructor(props){
    super(props)
  }

  componentWillUnmount(){

    var name = "";

    if(this.props.author && this.props.author.penName)
      name = this.props.author.penName;

    SA.sendEvent('Profile','close',name);
    window.onbeforeunload = undefined;
  }

  render(){
    var stories = this.props.stories;
    var author = this.props.author;

    if(!author && !stories){
      history.back()
    }

    var storyDiv = '';
    var authorDiv = '';
    var className='';

    if(stories && stories.length > 0){
      storyDiv = <div className="block">
        <div className="sideHeader">My Stories:</div>
        {
          stories.map(function(story,i) {
            return <StoryTile story={story} author={author} key={i} index={i} />;
          })
        }
      </div>
    }



    if(author && author.penName){
      className="profile";
      var imgSrc = "https://s3.ap-south-1.amazonaws.com/bsstory/"+author.penName+"/profile.jpg"
      const imageStyle = {
        background: 'url(' + imgSrc + ') no-repeat center',
        backgroundSize:'cover'
      }
      authorDiv = <div className="block">
        <div className="authorImage a2" style={imageStyle}></div>
        <ul className="personal">
          <li>{author.profile.fullName}</li>
          <li>{author.email}</li>
          <li>{author.penName.capitalizeFirstLetter()}</li>
        </ul>
        <p>{author.profile.intro} </p>
      </div>

      if( 0 > document.title.indexOf(author.penName)){
        var title = 'profile-'+author.penName
        document.title = author.penName + " -"+window.getString("companyPromo");
        SA.sendPageView(title,title);
        window.onbeforeunload = () => {
            var name = this.props.story.name.removeSpaceAndCapitals();
            SA.sendEvent('Profile','close',author.penName);
          }
      }
    }
    return(
      <div className={className}>
        {authorDiv}

        {storyDiv}
      </div>
    )
  }

}

export default View;
