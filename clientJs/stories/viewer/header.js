'use strict';
import React from 'react';
import styles from '../../css/header.css';

const View = ({story})=>{
  return(
    <div className="contentHeader" >
      <img className="a1" src="https://s3.ap-south-1.amazonaws.com/bsstory/phani/profile.jpg"></img>
      <div className="title">{story.name}</div>
      <ul className="actions">
        <li className="info">{story.author}</li>
        <li className="info">{story.social.views} views</li>
        <li className="info">{story.social.favs} likes</li>
        <li>Read Later</li>
        <li>Like</li>
        <li>Share</li>
      </ul>
    </div>
  )
}

export default View;
