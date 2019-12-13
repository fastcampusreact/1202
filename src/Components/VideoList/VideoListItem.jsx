import React from 'react';
import './VideoListItem.css';

const VideoListItem = props =>{
  console.log(props);
  const videoData={//위에서 상수로 1.재사용성,2.렌더되는 함수는 짧게
    title:props.snippet.title,
    img:props.snippet.thumbnails.medium.url,
    channel:props.snippet.channelTitle,
    // id:props.id.videoId
  };
  
  return (//속성을 짧게 접근하기 위해서 ,
    <div className="item-wrapper">
      <li className="videoslist-item" onClick={()=>props.onVideoSelect(props)}>{/**타고타고 들어온 props.id.videoId.id */}
        <img src={videoData.img} alt={videoData.title}  className="video-img" />
        <div className="video-details">
          <small className="video-title">{videoData.title}</small>
          <br/>
          <span className="video-channel">{videoData.channel}</span>
        </div>
      </li>
    </div>
  );
};
export default VideoListItem;
