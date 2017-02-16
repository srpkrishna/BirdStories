'use strict';
import React from 'react';
import styles from '../../css/footer.css';
import Social from '../../util/social.js';
import { Link } from 'react-router';

const View = ({story,authorLink, updateSocial})=>{
  var shareUrl = window.location.href;
  var title = story.name + " - "+"sukatha.com"

  return(
    <div className="contentFooter" >
      <div className="authTitle">
        <Link to={authorLink}>More from {story.author.capitalizeFirstLetter()}</Link>
      </div>
      <Social shareUrl={shareUrl} title={title} updateSocial={updateSocial}/>
    </div>
  )
}

export default View;
