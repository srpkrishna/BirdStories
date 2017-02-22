'use strict';
import React from 'react';
import styles from '../../css/header.css';
import Social from '../../util/social.js';
import { Link } from 'react-router';

const View = ({story,authorLink,updateSocial})=>{
  var shareUrl = window.location.href;
  var title = story.displayName + " - "+"sukatha.com"
  var imgSrc = "https://s3.ap-south-1.amazonaws.com/bsstory/"+story.author+"/profile.jpg"
  const imageStyle = {
    background: 'url(' + imgSrc + ') no-repeat center',
    backgroundSize:'cover'
  }

  var name = story.name.replace(/\s+/g, '').toLowerCase();
  const coverImg = "https://s3.ap-south-1.amazonaws.com/bsstory/"+story.author+"/"+name+"/cover.jpg"

  return(
    <div className="contentHeader" >
      <div className="authTitle">- {story.authorDisplayName}</div>
      <Link to={authorLink}>
        <div className="authorImage" style={imageStyle}></div>
      </Link>
      <div className="title">{story.displayName}</div>
      <ul className="actions">
        <li className="info">{story.social.views} Views</li>
        <li className="info">{story.social.likes} Likes</li>
        <Social shareUrl={shareUrl} title={title} pic={coverImg} updateSocial={updateSocial}/>
      </ul>

    </div>
  )
}

export default View;
