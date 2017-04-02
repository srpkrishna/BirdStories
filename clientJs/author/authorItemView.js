'use strict';

import React from 'react';
import styles from '../css/item.css';
import { Link } from 'react-router';

const View = ({ author }) => {

  const className = "item clrWhite"
  const link = "/author/"+author.penName;
  const linkObj = {
      pathname:link,
      state:author
  }

  var imgSrc = "https://s3.ap-south-1.amazonaws.com/bsstory/"+author.penName+"/profile.jpg"
  const imageStyle = {
    background: 'url(' + imgSrc + ') no-repeat center',
    backgroundSize:'cover'
  }

  return (
        <Link to={linkObj} className={className} >
          <div className="image" style={imageStyle}></div>
          <div className="info">
            <div className="name">{author.profile.fullName}</div>
            <div className="shortText">{author.profile.intro}</div>
            <div className="bottomRight">{author.profile.qual}</div>
          </div>
        </Link>
  )
}

export default View;
//<button onClick={() => updateSocial(index,'views')}> +1 </button>
