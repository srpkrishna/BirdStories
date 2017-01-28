'use strict';

import React from 'react';

const View = ({content}) => {
  let htmlContent = [];
  const styles = content.styles;
  var i = 0;
  for (var paraObj of content.content){
    let paraStyle = styles[paraObj.style];
    if(!paraStyle){
      paraStyle = styles["default"];
    }

    // if(paraObj.imgsrc){
    //   htmlContent.push(<img src={paraObj.imgsrc} />)
    // }

    htmlContent.push(<p style={paraStyle} key={i}>{paraObj.text}</p>);
    i++;
  }

  return(
    <div className="contentBody">
      {htmlContent}
    </div>
  )
}

export default View;
