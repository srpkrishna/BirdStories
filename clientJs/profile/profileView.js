'use strict';
import React from 'react';
import Styles from './profile.css';
import StoryTile from './storyListView.js';

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

  var imgSrc = "/img/a.jpeg"
  const imageStyle = {
    background: 'url(' + imgSrc + ') no-repeat center',
    backgroundSize:'cover'
  }

  if(author && author.penName){
    className="profile"
    authorDiv = <div className="block">
      <div className="authorImage a2" src={imgSrc} style={imageStyle}></div>
      <ul className="personal">
        <li>{author.profile.fullName}</li>
        <li>{author.email}</li>
        <li>{author.penName.capitalizeFirstLetter()}</li>
      </ul>
      <p>{author.profile.intro} </p>
    </div>
  }
  return(
    <div className={className}>
      {authorDiv}

      {storyDiv}
    </div>
  )


}

export default View;
