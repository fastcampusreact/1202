import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = props => {
  const { videoId } = props;
  if (!videoId) return null;
  const url = `https://youtube.com/embed/${videoId}`;
  const state = props.videos.filter(video => video.id.videoId === videoId);
  return (
    <div className="video-detail">
      <div className="video-detail-wrapper">
        <iframe src={url} title={videoId} className="video-player" />
        <h4 className="main-video-title">{state[0].snippet.title}</h4>
        <small className="main-video-channelTitle">
          {state[0].snippet.channelTitle}
        </small>
        <br />
        <small className="main-video-description">
          {state[0].snippet.description}
        </small>
      </div>
      {props.children}
    </div>
  )
};

export default VideoPlayer;