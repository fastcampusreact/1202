import React from 'react';
import './VideoList.css';
import uuid from 'uuid';
import VideoListItem from './VideoListItem';
// import VideoDetail from '../VideoPlayer/VideoDetail';

const VideoList =props=>{
  const videos = //갈끔하게 하기위해서 const로 빼놓았다.
  props.videos.map(
    video => <VideoListItem {...video} key={uuid.v4()} onVideoSelect={props.onVideoSelect}/>);
    //상위에서 하위로 사용할수있도록 props로 전달해준다.
  return (
    <div className="videoList-Wrapper">
      <ul className="videoList">
        {videos}
      </ul>
    </div>
  )
}
export default VideoList;
