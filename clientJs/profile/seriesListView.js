'use strict';
import Styles from './storyList.css'
import React from 'react';
import { Link } from 'react-router';

const View = ({ series,author }) => {

  const link = "/seriesList/series"
  var name = series.name.removeSpaceAndCapitals();
  var episode = series.episodes.length
  const query = {t:series.timestamp,a:series.author,n:name,e:episode}
  const linkObj = {
      pathname:link,
      query:query,
      state:{series:series,author:author}
  }

  const imgSrc = "https://s3.ap-south-1.amazonaws.com/bsstory/"+series.author+"/"+name+"/cover.jpg"
  const imageStyle = {
    background: 'url(' + imgSrc + ') no-repeat center top',
    backgroundSize:'cover'
  }

  return (
        <Link to={linkObj} className="list" >
          <div className="image" style={imageStyle}></div>
          <div className="info">
            <div className="name">{series.displayName}</div>
            <ul className="shortText">
              <li>{series.social.reads} Reads</li>
              <li>{series.social.shares} Shares</li>
              <li>{series.social.views} Views</li>
              <li>{series.social.favs} Likes</li>
            </ul>
          </div>

        </Link>
  )
}

export default View;
//<button onClick={() => updateSocial(index,'views')}> +1 </button>
