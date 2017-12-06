'use strict';

import React from 'react';
import Utils from '../util/utilityFunctions';
import appStore from '../img/appStore.png';
import playStore from '../img/playStore.png';

const View = ({content}) => {
  let htmlContent = [];

  if(!content.code)
  {
    const styles = content.styles;
    var i = 0;
    for (var paraObj of content.content){
      let paraStyle = styles[paraObj.style];
      if(!paraStyle){
        paraStyle = styles["default"];
      }

      if(paraObj.imgsrc){
        let imgStyle = styles[paraObj.imgstyle];
        if(!imgStyle)
          imgStyle = styles["defaultImg"];
        htmlContent.push(<img style={imgStyle} src={paraObj.imgsrc} key={'img'+i} />)
      }

      if(paraObj.text){
        var br = React.createElement('br');
        var regex = /\n/;
        var content = paraObj.text.split(regex).map(function(line, index) {
          if(index > 0){
            let breaks = [];
            breaks.push(<br key={"break_" + index} /> )
            breaks.push(line)
            return breaks;
          }else{
            return line;
          }
        })

        htmlContent.push(<p style={paraStyle} key={i}>{content}</p>);
      }
      i++;
    }

    var paraStyle = {
      color:"#d12767",
      textIndent:0,
      padding:"0.5rem",
      textAlign:"center"
    }

    if(Utils.isMobile()){

      var hrefLink = ""
      var imgSrc = ""

      if(Utils.isIPhone()){
        hrefLink = "https://itunes.apple.com/in/app/sukatha/id1286552286?mt=8";
        imgSrc = appStore
      }else{
        hrefLink = "https://play.google.com/store/apps/details?id=com.sukatha";
        imgSrc = playStore
      }

      var imgStyle = {
        height:'50px',
        background: 'url(' + imgSrc + ') no-repeat center',
        backgroundSize:'cover'
      }

      htmlContent.push(<p style={paraStyle} key={i}>{"మరిన్ని మంచి కథలు మా app లో చదవండి. ఇన్స్టాల్ చేసుకోవటానికి ఇక్కడ క్లిక్ చేయండి."}</p>);
      htmlContent.push(<a target="_blank" key={i+1} href={hrefLink}><img src={imgSrc} ></img></a>);
    }else{
      htmlContent.push(<p style={paraStyle} key={i}>{"'కిక్' ఇచ్చేవి చాలా ఉండొచ్చు. కాని అందులో ఆరోగ్యానికి హానికరం కానివి మాత్రం మీ కామెంట్స్, లైక్స్ మరియు షేర్స్!"}</p>);
    }

  }else{
    //show error
  }


  return(
    <div className="contentBody">
      {htmlContent}
    </div>
  )
}

export default View;
