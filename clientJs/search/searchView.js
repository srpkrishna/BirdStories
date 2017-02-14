'use strict';

import React from 'react';
import  StoryItem from '../stories/storyItemView';
import  AuthorItem from '../author/authorItemView';
import styles from '../css/search.css';

const View = ({searchText,stories,authors,handleChange}) => {

  var noResultTag = ""
  if(searchText.length>=2 && stories.length == 0 && authors.length == 0){
    noResultTag =  <div>{window.getString("noResults")}</div>
  }

  var storiesDiv = ""
  if(searchText.length >= 2){
    storiesDiv = stories.map(function(story,i) {
      return <StoryItem story={story} key={i} index={i} />;
    })
  }

  var authorsDiv = ""
  if(searchText.length >= 2){
    authorsDiv = authors.map(function(author,i) {
      return <AuthorItem author={author} key={i} index={i} />;
    })
  }

  return (
    <div className="searchBody">
      <div className="search">
        <input type="text" name="search" placeholder="Search.." className="m-9" value={searchText} onChange={(evt)=>{handleChange(evt)}}></input>
      </div>

      <div className="storiesBlock">
        {storiesDiv}
      </div>
      <div className="authorsBlock">
        {authorsDiv}
      </div>
      <div className="noResults">
        {noResultTag}
      </div>
    </div>
  )
}

export default View;
