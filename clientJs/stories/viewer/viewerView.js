'use strict';
import React from 'react';
import styles from '../../css/viewer.css';
import Body from './body'
import Header from './header'

const View = ({content,story}) => {
  var tag = ""
  if(content)
    tag = <Body content={content} />


  return(
    <div>
      <Header story={story} />
      {tag}
      <div className="contentFooter" />
    </div>
  )
}

export default View;
