'use strict';

import React from 'react';
import styles from '../css/item.css';

const View = ({ author,index }) => {

  const imgSrc = "/img/p"+(index%3)+".jpg"
  const className = "item clrWhite"
  return (
        <a className={className}>
          <img className="image" src={imgSrc}></img>
          <div className="info">
            <div className="name">{author.profile.fullName}</div>
            <div className="shortText">{author.profile.intro}</div>
            <div className="bottomRight">{author.profile.qual}</div>
          </div>
        </a>
  )
}

export default View;
//<button onClick={() => updateSocial(index,'views')}> +1 </button>
