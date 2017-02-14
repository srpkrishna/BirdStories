'use strict';
import React from 'react';
import  StoryItem from '../stories/storyItemView';
import Styles from '../css/author.css'

const View = ({ stories,author}) => {

  var storyDiv = '';
  var authorDiv = '';
  if(stories && stories.length > 0){
    storyDiv = <div className="storiesBlock">
      {
        stories.map(function(story,i) {
          return <StoryItem story={story} author={author} key={i} index={i} />;
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

    document.title = author.penName + " -"+window.getString("companyPromo");

    authorDiv = <div className="authorProfile" >
      <div className="authorImage a2" src={imgSrc} style={imageStyle}></div>
      <ul>
        <li>{author.profile.fullName}</li>
        <li>{author.profile.qual}</li>
        <li>{author.profile.prof}</li>
      </ul>
      <p>{author.profile.intro} </p>
      {storyDiv}
    </div>
  }
  return(
    <div>
      {authorDiv}
    </div>
  )


}

export default View;
