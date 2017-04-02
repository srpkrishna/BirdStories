'use strict';
import React from 'react';
import  StoryItem from '../stories/storyItemView';
import Styles from '../css/author.css';
import SA from '../util/analytics';

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



  if(author && author.penName){

    if( 0 > document.title.indexOf(author.penName)){
      document.title = author.penName + " -"+window.getString("companyPromo");
      SA.sendPageView(author.penName);
    }

    var imgSrc = "https://s3.ap-south-1.amazonaws.com/bsstory/"+author.penName+"/profile.jpg"
    const imageStyle = {
      background: 'url(' + imgSrc + ') no-repeat center',
      backgroundSize:'cover'
    }

    authorDiv = <div className="authorProfile" >
      <div className="authorImage a2" style={imageStyle}></div>
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
