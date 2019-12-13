import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = props =>{


  const {videoId}=props;
  // if(!props.videos) return null;
  // let videoId=props.videos.id.videoId
  if(!videoId)return null;
  const url=`https://youtube.com/embed/${props.videoId.id.videoId}`;
  console.log(props.videoId.id.videoId);
return(
<div>
  <div>
    {/* <iframe src={url} title={props.videos.title}/> */}
    <iframe src={url} title={videoId.title}/>
    <h4>{videoId.snippet.title}</h4>
    <small>
      {videoId.snippet.channelTitle}
    </small>
    <br/>
    <small> 
      {videoId.snippet.description}
    </small>
  </div>
</div>
)
}
export default VideoPlayer;