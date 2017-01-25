'use strict';

import React from 'react';
import  StoryItem from '../stories/storyItemView';
import  AuthorItem from '../author/authorItemView';
import styles from '../css/search.css';

const View = ({ stories,authors}) => {
  return (
    <div>
      <div className="storiesBlock">
        {
          stories.map(function(story,i) {
            return <StoryItem story={story} key={i} index={i} />;
          })
        }
      </div>
      <div className="authorsBlock">
        {
          authors.map(function(author,i) {
            return <AuthorItem author={author} key={i} index={i} />;
          })
        }
      </div>
    </div>
  )
}

export default View;
