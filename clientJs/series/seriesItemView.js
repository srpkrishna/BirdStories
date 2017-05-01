'use strict';

import React from 'react';
import styles from '../css/seriesItem.css';
import { Link } from 'react-router';
import EpisodeStrip from '../viewer/episodeStrip';

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

  var mins = window.getString("mins")
  if(1 === series.time)
    mins  = window.getString("min")

  var metrics = ""

  if(series.genre && series.genre.length > 0){
    metrics = series.genre[0].capitalizeFirstLetter();
    for(var i = 1 ; i < series.genre.length ; i++){
      metrics = metrics +"-"+series.genre[i].capitalizeFirstLetter()
    }
  }

  var views = window.getString("views")
  if(1 === series.social.views)
    views = window.getString("view")

  metrics = metrics +" . "+series.social.views+views

  var episodeNumber = Number(episode)

  return (
        <Link to={linkObj} className="seriesItem" >
          <div className="image" style={imageStyle}>
            <div className="time"> {metrics}</div>
          </div>
          <div className="info">
            <div className="name">{series.displayName}</div>
            <div className="shortText">{series.shortText}</div>
            <div className="episodeText">Latest episode - {series.episodes[episodeNumber -1]}</div>
            <div className="bottomRight"> - {series.authorDisplayName}</div>
          </div>
        </Link>
  )
}

export default View;
//<button onClick={() => updateSocial(index,'views')}> +1 </button>
