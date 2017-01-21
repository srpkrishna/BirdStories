'use strict';

import React from 'react';
import  StoryItem from './storyItemView';

const divStyle = {
  color: 'blue',
  width: '100px'
};

const divStyleRow = {
  color: 'red',
  width: '100%',
  height: '50px'
};

const View = ({ stories, updateSocial}) => {
  return (
    <div>
      <h2>Recent Stories</h2>
      <table><tbody>
      <tr style={divStyleRow}>
          <th style={divStyle}>{'Name'}</th>
          <th style={divStyle}>{'Author'}</th>
          <th style={divStyle}>{'Year'}</th>
          <th style={divStyle}>{'Genre'}</th>
          <th style={divStyle}>{'Score'}</th>
          <th style={divStyle}>{'Views'}</th>
      </tr>
      {
        stories.map(function(story,i) {
          return <StoryItem story={story} updateSocial={updateSocial} key={i} index={i} />;
        })
      }
      </tbody></table>
    </div>
  )
}

export default View;
