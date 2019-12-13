import React from 'react';
import './VideoList.css';

const VideoListItem = props => {
  const videoData = {
    title: props.snippet.title,
    img: props.snippet.thumbnails.default.url,
    channel: props.snippet.channelTitle,
    id: props.id.videoId
  };
  return (
    <li className="list-item" onClick={() => props.onVideoSelect(videoData.id)}>
      <img src={videoData.img} alt={videoData.title} className="thumbnail" />
      <div className="text-container">
      <span>{videoData.title}</span>
      <small>{videoData.channel}</small>
      </div>
    </li>
  )
};

export default VideoListItem;