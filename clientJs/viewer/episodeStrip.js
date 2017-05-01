'use strict';
import React, { Component } from 'react';
import styles from '../css/episodes.css';
import { Link } from 'react-router';

class View extends Component {

  getStateObject(props){
    let state = {
      index:props.episode
    }
    return state;
  }

  constructor(props){
    super(props)
    this.state = this.getStateObject(props)
  }

  componentWillReceiveProps(nextProps){
    this.state = this.getStateObject(nextProps)
  }

  render(){

    var that = this;
    var infoCssClass = "episode highlight"
    const series =  this.props.series
    const author = this.props.author
    const link = "/seriesList/series"
    const name = series.name.removeSpaceAndCapitals();

    var episodes = series.episodes.map(function(episode,i) {
      var episodeNumber = i+1
      var className = "episode"

      var query = {t:series.timestamp,a:series.author,n:name,e:episodeNumber}
      var linkObj = {
          pathname:link,
          query:query,
          state:{series:series,author:author}
      }

      if(episodeNumber == that.state.index){
        className = "episode highlight"
        infoCssClass = "episode"
      }
      return(<li key={episodeNumber} className={className}>
          <Link to={linkObj}>{episodeNumber}</Link>
      </li>)
    })

    var query = {t:series.timestamp,a:series.author,n:name}
    var linkObj = {
        pathname:link,
        query:query,
        state:{series:series,author:author}
    }

    return(
      <div className="episodeStrip">
        <div className="title">Episodes</div>
        <ul className="episodes">
          <li key={0} className={infoCssClass}>
            <Link to={linkObj} >i</Link>
          </li>
          {episodes}
        </ul>
      </div>
    )
  }
}

export default View;
