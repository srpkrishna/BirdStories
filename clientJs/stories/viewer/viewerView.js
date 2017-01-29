'use strict';
import React from 'react';
import styles from '../../css/viewer.css';
import Body from './body'
import Header from './header'

const View = ({content,story,author}) => {
  var tag = []
  if(content && story && author){
    tag.push(<Header story={story} key={0}/>)
    tag.push(<Body content={content} key={1}/>)
    tag.push(<div className="contentFooter" key={2}/>)
  }


  return(
    <div>
      {tag}
    </div>
  )
}

export default View;
