'use strict';

import React,{Component} from 'react';
import  StoryItem from './storyItemView';
import styles from '../css/stories.css';

class View extends Component {
  constructor(props){
    super(props)
    this.state = { imageStatus: true };
  }

  handleImageErrored() {
    this.setState({ imageStatus:false });
  }

  render(){
    var storyDivs = '';
    if(this.props.stories){
      storyDivs = this.props.stories.map(function(story,i) {
        return <StoryItem story={story} key={i} index={i} />;
      })
    }

    var img = <img className="adImage" src="https://s3.ap-south-1.amazonaws.com/imagesbs/ad.png" onError={this.handleImageErrored.bind(this)} />

    if(!this.state.imageStatus){
      img = ""
    }

    var moreTag = ""
    if(this.props.stories.length >0  && this.props.stories.length%12 == 0 ){
          moreTag = <li className="moreStories"><button onClick={this.props.showMoreStories} type="button">{window.getString("more")}</button></li>
    }

    return (
      <div className="stories">
        {img}
        {storyDivs}
        {moreTag}
      </div>
    )
  }

}


export default View;
