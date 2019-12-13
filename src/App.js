import React, { Component } from 'react';
import { debounce } from "lodash"
import './App.css';
import axios from 'axios';
import Nav from "./components/Nav/Nav"
import SearchBar from "./components/SearchBar/SearchBar"
import VideoList from "./components/VideoList/VideoList"
import VideoPlayer from "./components/VideoPlayer/VideoPlayer"
import InfiniteScroll from "react-infinite-scroller"
import uuid from "uuid"
import spinner from "./components/images/spinner.gif"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videos: [], // Video 데이터들
      selectedVideoId: null, // 선택된 비디오 ID
      query: "",
      nextPageToken: null
    }

    this.defaultState = this.state // state 백업본 - query 초기화 시 사용

    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this))
  }

  async getYoutubeData(query) {
    if (!query) return
    if (this.state.query !== query) {
      this.setState(this.defaultState)
    }

    const { nextPageToken } = this.state

    const params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      q: query,
      part: "snippet",
      pageToken: nextPageToken,
      maxResults: 10
    }

    const { data } = await axios.get("https://www.googleapis.com/youtube/v3/search", { params })
    this.setState({
        videos: data.items,
        query,
        nextPageToken: data.nextPageToken,
    })
    console.log(data)
  }



  async componentDidMount () {
    await this.getYoutubeData("여행")
  }


  render () {
    const { nextPageToken, selectedVideoId, query } = this.state
    return (
      <div className="App">
        <Nav>
        <SearchBar setInput={this.setInput} onSearchVideos={debounce(this.getYoutubeData, 500)}/>
        </Nav>
        {
          selectedVideoId
          ? <VideoPlayer videoID={selectedVideoId} />
          : <InfiniteScroll
              loadMore={() => this.getYoutubeData(query)} // 로드하는데 더 로드 하라는 뜻(사용자가 스크롤을 끝까지 내렸을 때)
              hasMore={!!nextPageToken}
              loader={
                <div key={uuid.v4()} className="loader">
                  <img src={spinner} alt="loading" />
                </div>
              }>
              <VideoList
                {...this.state}
                onVideoSelect={(selectedVideoId) => this.setState({ selectedVideoId })}
              />
            </InfiniteScroll>
        }
      </div>
    );
  }
}

export default App
