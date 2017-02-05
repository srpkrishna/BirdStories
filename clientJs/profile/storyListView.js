'use strict';
import Styles from './storyList.css'
import React from 'react';
import { Link } from 'react-router';
import styles from '../css/item.css';

const View = ({ story,index,author }) => {

  const imgSrc = "/img/"+(index%3)+".jpg"
  const className = "list clr"+(index%4)
  const link = "/stories/story"
  const query = {a:story.author,id:story.timestamp}
  const linkObj = {
      pathname:link,
      query:query,
      state:{story:story,author:author}
  }


  return (
        <Link to={linkObj} className={className} >
          <img className="image" src={imgSrc}></img>
          <div className="info">
            <div className="name">{story.name}</div>
            <ul className="shortText">
              <li>{story.social.reads} Reads</li>
              <li>{story.social.shares} Shares</li>
              <li>{story.social.views} Views</li>
              <li>{story.social.favs} Likes</li>
            </ul>
          </div>

        </Link>
  )
}

export default View;
//<button onClick={() => updateSocial(index,'views')}> +1 </button>
