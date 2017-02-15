'use strict';
import React from 'react';
import styles from '../../css/header.css';
import Social from '../../util/social.js';
import { Link } from 'react-router';

const View = ({story,authorLink,updateSocial})=>{
  var shareUrl = window.location.href;
  var title = story.name + " - "+"sukatha.com"


  return(
    <div className="contentHeader" >
      <div className="authTitle">- {story.author}</div>
      <Link to={authorLink}>
        <img className="a1" src="https://s3.ap-south-1.amazonaws.com/bsstory/phani/profile.jpg"></img>
      </Link>
      <div className="title">{story.name}</div>
      <ul className="actions">
        <li className="info">{story.social.views}Views</li>
        <li className="info">{story.social.likes}Likes</li>
        <Social shareUrl={shareUrl} title={title} updateSocial={updateSocial}/>
      </ul>

    </div>
  )
}

export default View;
