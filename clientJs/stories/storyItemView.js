'use strict';

import React from 'react';
import styles from '../css/item.css';

const View = ({ story,index, updateSocial }) => {

  const imgSrc = "/img/"+(index%3)+".jpg"
  const className = "item clr"+(index%4)
  return (
        <a className={className}>
          <img className="image" src={imgSrc}></img>
          <div className="info">
            <div className="name">{story.name}</div>
            <div className="shortText">Edho okasari ala chima basics vasthe vaser chitaki vela chiru kursi andhakaram ayyindhi</div>
            <div className="bottomRight"> - By {story.author}</div>
          </div>
        </a>
  )
}

export default View;
//<button onClick={() => updateSocial(index,'views')}> +1 </button>
