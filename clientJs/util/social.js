import React, { Component } from 'react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');

class Share extends Component {

  constructor(props){
    super(props)
    this.likeClick = this.likeClick.bind(this);
    this.shareClick = this.shareClick.bind(this);
  }

  likeClick(){
    this.props.updateSocial('favs');
  }
  shareClick(){
    this.props.updateSocial('shares');
  }
  render(){
    const shareUrl = this.props.shareUrl;
    const title = this.props.title;
    var size = 36;

    if(this.props.size){
      size = this.props.size

    }

    var likeSize = size-8;
    var likeStyle = {
      fontSize:likeSize+'px',
      padding:'3px',
      borderRadius:'50%',
      backgroundColor:'#162b4d'
    }

    return (
      <ul className="share">
        <li onClick={this.likeClick} ><i className="material-icons" style={likeStyle}>plus_one</i></li>
        <li onClick={this.shareClick} >
          <FacebookShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <FacebookIcon
              size={size}
              round />
          </FacebookShareButton>
        </li>

        <li onClick={this.shareClick}>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <TwitterIcon
              size={size}
              round />
          </TwitterShareButton>
        </li>

        <li onClick={this.shareClick}>
          <GooglePlusShareButton
            url={shareUrl}
            className="Demo__some-network__share-button">
            <GooglePlusIcon
              size={size}
              round />
          </GooglePlusShareButton>
        </li>

      </ul>
    );
  }

}

export default Share;
