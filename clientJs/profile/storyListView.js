'use strict';
import Styles from './storyList.css'
import React from 'react';
import { Link } from 'react-router';
import styles from '../css/item.css';

const View = ({ story,index,author }) => {

  const className = "list clr"+(index%4)
  const link = "/stories/story"
  var name = story.name.removeSpaceAndCapitals();
  const query = {t:story.timestamp,a:story.author,n:name}
  const linkObj = {
      pathname:link,
      query:query,
      state:{story:story,author:author}
  }

  const imgSrc = "https://s3.ap-south-1.amazonaws.com/bsstory/"+story.author+"/"+name+"/cover.jpg"
  const imageStyle = {
    background: 'url(' + imgSrc + ') no-repeat center',
    backgroundSize:'cover'
  }

  return (
        <Link to={linkObj} className={className} >
          <div className="image" style={imageStyle}></div>
          <div className="info">
            <div className="name">{story.displayName}</div>
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
