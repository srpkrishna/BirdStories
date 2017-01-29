'use strict';

import React from 'react';
import styles from '../css/item.css';
import { Link } from 'react-router';

const View = ({ author,index }) => {

  const imgSrc = "/img/p"+(index%3)+".jpg"
  const className = "item clrWhite"
  const link = "/author/"+author.penName;
  const linkObj = {
      pathname:link,
      state:author
  }

  return (
        <Link to={linkObj} className={className} >
          <img className="image" src={imgSrc}></img>
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
