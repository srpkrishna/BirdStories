'use strict';

import React from 'react';
import  StoryItem from './storyItemView';
import styles from '../css/stories.css';

const View = ({ stories}) => {

  var storyDivs = '';
  if(stories){
    storyDivs = stories.map(function(story,i) {
      return <StoryItem story={story} key={i} index={i} />;
    })
  }


  const imageStyle = {
    background: 'url("https://s3.ap-south-1.amazonaws.com/imagesbs/ad.png") no-repeat center',
    backgroundSize:'cover'
  }
  return (
    <div className="stories">
      {storyDivs}
    </div>
  )
}

export default View;
