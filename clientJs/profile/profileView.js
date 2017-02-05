'use strict';
import React from 'react';
import Styles from './profile.css'
import StoryTile from './storyListView.js'

/*<div className="sideHeader">Personal Info:</div>
<p>{author.profile.qual}</p>
<p>{author.profile.prof}</p>
<div className="sideHeader">Intro:</div>
<p>{author.profile.intro} </p>*/

const View = ({ stories,author}) => {

  var storyDiv = '';
  var authorDiv = '';
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
    authorDiv = <div className="block">
      <img className="authorImage a2" src="/img/a.jpeg"></img>
      <ul className="personal">
        <li>{author.profile.fullName}</li>
        <li>{author.email}</li>
        <li>{author.penName}</li>
      </ul>
    </div>
  }
  return(
    <div className="profile">
      {authorDiv}

      {storyDiv}
    </div>
  )


}

export default View;
