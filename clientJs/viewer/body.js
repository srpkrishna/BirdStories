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
