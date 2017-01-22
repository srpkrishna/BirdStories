'use strict';

import React from 'react';
import styles from '../css/storyItem.css';

const View = ({ story,index, updateSocial }) => {

  const imgSrc = "/img/"+(index%3)+".jpg"
  const className = "storyItem clr"+(index%4)
  return (
        <a className={className}>
          <img className="image" src={imgSrc}></img>
          <div className="info">
            <div className="name">{story.name}</div>
            <div className="shortText">chima chitaki vela chiru kursi andhakaram ayyindhi</div>
            <div className="author"> - By {story.author}</div>
          </div>
        </a>
  )
}

export default View;
//<button onClick={() => updateSocial(index,'views')}> +1 </button>
