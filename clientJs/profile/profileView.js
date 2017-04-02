'use strict';
import React from 'react';
import Styles from './profile.css';
import StoryTile from './storyListView.js';
import SA from '../util/analytics';

const View = ({stories,author}) => {

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
    }
  }
  return(
    <div className={className}>
      {authorDiv}

      {storyDiv}
    </div>
  )


}

export default View;
