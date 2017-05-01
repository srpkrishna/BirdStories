'use strict';

import React,{Component} from 'react';
import  StoryItem from './storyItemView';
import styles from '../css/stories.css';

class View extends Component {
  constructor(props){
    super(props)
  }

  render(){
    var storyDivs = '';
    if(this.props.stories){
      storyDivs = this.props.stories.map(function(story,i) {
        return <StoryItem story={story} key={i} index={i} />;
      })
    }

    var moreTag = ""
    if(this.props.stories.length >0  && this.props.stories.length%6 == 0 ){
          moreTag = <li className="moreStories"><button onClick={this.props.showMoreStories} type="button">{window.getString("more")}</button></li>
    }

    return (
      <div className="stories">
        {storyDivs}
        {moreTag}
      </div>
    )
  }

}


export default View;
