'use strict';

import React from 'react';
import styles from '../css/item.css';
import { Link } from 'react-router';

const View = ({ story,index, updateSocial }) => {

  const imgSrc = "/img/"+(index%3)+".jpg"
  const className = "item clr"+(index%4)
  const link = "/stories/"+story.author+"/"+story.timestamp
  const linkObj = {
      pathname:link,
      state:{selected:story}
  }
  return (
        <Link to={linkObj} className={className} >
          <img className="image" src={imgSrc}></img>
          <div className="info">
            <div className="name">{story.name}</div>
            <div className="shortText">Edho okasari ala chima basics vasthe vaser chitaki vela chiru kursi andhakaram ayyindhi</div>
            <div className="bottomRight"> - {story.author}</div>
          </div>
        </Link>
  )
}

export default View;
//<button onClick={() => updateSocial(index,'views')}> +1 </button>
