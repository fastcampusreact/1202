import React from 'react';

import './index.css';

function VideoPlayer(props) {
  const { videoId } = props;
  const info = props.info[0];
  return (
    <div className="video-player-wrapper">
      <iframe
        className="video-player"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allowFullScreen
        title={info.snippet.title}
      />
      <h2 className="video-player-title">
        {info.snippet.title}
      </h2>
    </div>
  )
}

export default VideoPlayer;