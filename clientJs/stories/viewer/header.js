'use strict';
import React from 'react';

const View = ({story})=>{
  return(
    <div className="contentHeader" >
      <img className="authorImage a1" src="/img/a.jpeg"></img>
      <div className="title">{story.name}</div>
      <ul className="actions">
        <li>Read Later</li>
        <li>Like</li>
        <li>Share</li>
      </ul>
    </div>
  )
}

export default View;
