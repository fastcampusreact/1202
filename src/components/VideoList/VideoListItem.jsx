import React from "react"

const VideoListItem = (props) => {
  const videoData = {
    title: props.snippet.title,
    img: props.snippet.thumbnails.default.url,
    channel: props.snippet.channelTitle,
    id: props.id.videoId
  }

  return (
    <li className="list-item" onClick={() => props.onVideoSelect(videoData.id)}>
      <img src={videoData.img} alt="video thumbnail"/>
      <div>{videoData.title}</div>
    </li>
  )
}

export default VideoListItem
