import React from "react"
import VideoListItem from "./VideoListItem"
import "./VideoList.css"
import uuid from "uuid"

const VideoList = (props) => {
  console.log(props.videos)
  const videos = props.videos.map(video => <VideoListItem key={uuid.v4()} {...video}
    onVideoSelect={props.selectedVideoId}/>)

  return (
    <ul>
      {videos}
    </ul>
  )
}

export default VideoList
