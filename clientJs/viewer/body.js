'use strict';

import React from 'react';

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
    htmlContent.push(<p style={paraStyle} key={i}>{"'కిక్' ఇచ్చేవి చాలా ఉండొచ్చు. కాని అందులో ఆరోగ్యానికి హానికరం కానివి మాత్రం మీ కామెంట్స్, లైక్స్ మరియు షేర్స్!"}</p>);

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
