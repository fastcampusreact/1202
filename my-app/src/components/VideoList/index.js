import React from 'react';

import './index.css'

function VideoList(props) {
  return (
    <ul className="video-list">
      {props.children}
    </ul>
  );
}

export default VideoList;