'use strict';

import React from 'react';
import styles from '../css/item.css';
import { Link } from 'react-router';

const View = ({ story,index,author }) => {

  const className = "item clr"+(index%4)
  const link = "/stories/story"
  var name = story.name.replace(/\s+/g, '').toLowerCase();
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
          <div className="image" style={imageStyle}>
            <div className="time"> {story.time}:00</div>
          </div>
          <div className="info">
            <div className="name">{story.displayName}</div>
            <div className="shortText">{story.shortText}</div>
            <div className="bottomRight"> - {story.author.capitalizeFirstLetter()}</div>
          </div>
        </Link>
  )
}

export default View;
//<button onClick={() => updateSocial(index,'views')}> +1 </button>
