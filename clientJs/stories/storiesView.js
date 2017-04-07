'use strict';

import React,{Component} from 'react';
import  StoryItem from './storyItemView';
import styles from '../css/stories.css';
import SA from '../util/analytics';
import { Link } from 'react-router';

class View extends Component {
  constructor(props){
    super(props)
    this.state = { imageStatus: true };
  }

  handleImageErrored() {
    this.setState({ imageStatus:false });
  }

  componentWillUnmount(){
    window.onbeforeunload = undefined;
  }

  componentDidMount() {
    window.onbeforeunload = () => {
        SA.sendEvent('Home','close','home');
      }
  }

  render(){
    var storyDivs = '';
    if(this.props.stories){
      storyDivs = this.props.stories.map(function(story,i) {
        return <StoryItem story={story} key={i} index={i} />;
      })
    }

    var img = <Link to="/competition"> <div className="adImage">సు‘కథ’ నిర్వహించే వినూత్నమైన కథల పోటీలో పాల్గొని మీ ప్రతిభకి తగిన గుర్తింపు పొందండి. వివరాలకు ఇక్కడ క్లిక్ చేయండి. <img src="touch.png" className="adIcon"></img></div></Link>

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
