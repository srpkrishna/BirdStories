'use strict';
import React from 'react';
import styles from '../css/footer.css';
import Social from '../util/social.js';
import { Link } from 'react-router';
import CommentBox from './CommentBox';

const View = ({story,authorLink, updateSocial,publishComment})=>{
  var shareUrl = window.location.href;
  var title = story.displayName+ " | " + story.genre[0] + " | "+window.getString("companyPromo")
  var name = story.name.removeSpaceAndCapitals();
  const coverImg = "https://s3.ap-south-1.amazonaws.com/bsstory/"+story.author+"/"+name+"/cover.jpg"

  return(
    <div className="contentFooter" >
      <ul className="more">
        <li className="home"><Link to="/"> ← {window.getString("stories")}</Link></li>
        <li className="authHome"><Link to={authorLink}>{window.getString("moreFrom")} {story.authorDisplayName}</Link></li>
      </ul>
      <Social shareUrl={shareUrl} title={title} pic={coverImg} updateSocial={updateSocial}/>
      <CommentBox publishComment={publishComment} title={window.getString("commentText")}/>
    </div>
  )
}

export default View;
