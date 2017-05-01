'use strict';

import React from 'react';
import styles from '../css/item.css';
import { Link } from 'react-router';

const View = ({ story,index,author }) => {

  const className = "item clr"+(index%4)
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

  var mins = window.getString("mins")
  if(1 === story.time)
    mins  = window.getString("min")

  var metrics =story.time+mins

  if(story.genre && story.genre.length > 0){
    metrics = metrics+" . "+story.genre[0].capitalizeFirstLetter();
    for(var i = 1 ; i < story.genre.length ; i++){
      metrics = metrics +"-"+story.genre[i].capitalizeFirstLetter()
    }
  }

  var views = window.getString("views")
  if(1 === story.social.views)
    views = window.getString("view")

  metrics = metrics +" . "+story.social.views+views


  return (
        <Link to={linkObj} className={className} >
          <div className="image" style={imageStyle}>
            <div className="time"> {metrics}</div>
          </div>
          <div className="info">
            <div className="name">{story.displayName}</div>
            <div className="shortText">{story.shortText}</div>
            <div className="bottomRight"> - {story.authorDisplayName}</div>
          </div>
        </Link>
  )
}

export default View;
//<button onClick={() => updateSocial(index,'views')}> +1 </button>
