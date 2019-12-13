import React from 'react';

import './index.css'

function VideoListItem(props) {
  const { snippet, onSelect, id } = props;
  return (
    <li className="video" onClick={e => onSelect(id)}>
      <div className="video-wrapper clearfix">
        <h2 className="video-title">{snippet.title}</h2>
        <img
          className="video-thumbnail"
          src={snippet.thumbnails.default.url}
          alt="비디오 썸네일"
        />
        <p className="video-description">
          {snippet.description}
        </p>
      </div>
    </li>
  );
}

export default VideoListItem;