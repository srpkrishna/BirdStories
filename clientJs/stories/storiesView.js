'use strict';

import React from 'react';
import  StoryItem from './storyItemView';
import styles from '../css/stories.css';

const View = ({ stories, updateSocial}) => {
  return (
    <div className="stories">
      {
        stories.map(function(story,i) {
          return <StoryItem story={story} updateSocial={updateSocial} key={i} index={i} />;
        })
      }
    </div>
  )
}

export default View;
