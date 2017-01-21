'use strict';

import React from 'react';

const divStyle = {
  color: '#cc6600',
  width: '100px'
};

const divStyleRow = {
  color: 'red',
  width: '100%',
  height: '50px'
};

const View = ({ story,index, updateSocial }) => (
      <tr style={divStyleRow}>
          <td style={divStyle}>{story.name}</td>
          <td style={divStyle}>{story.author}</td>
          <td style={divStyle}>{story.year}</td>
          <td style={divStyle}>{story.genre[0]}</td>
          <td style={divStyle}>{story.score.toFixed(1)}</td>
          <td style={divStyle}>{story.social.views}</td>
          <td style={divStyle}>
            <button onClick={() => updateSocial(index,'views')}> +1 </button>
          </td>
      </tr>
)

export default View;
