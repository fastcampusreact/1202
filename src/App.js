import React from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import uuid from 'uuid';

import Nav from './components/Nav'
import SearchBar from './components/SearchBar'
import VideoList from './components/VideoList'
import VideoPlayer from './components/VideoPlayer'

import { spinner } from './components/Images'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    // this.state = {}; // 초기화를 해주어야 함
    // this.getYoutubeData = this.getYoutubeData.bind(this);

    // 바인딩을 모두 자동으로 해주는 함수
    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this));

    this.state = {
      videos: [],
      selectedVideo: null,
      query: '',
      nextPageToken: null
    };
    this.defaultState = this.state;
  }

  async getYoutubeData(query) {
    if (!query) return;
    if (this.state.query !== query) {
      this.setState(this.defaultState);
    }

    const { nextPageToken } = this.state;
    const params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      q: query,
      part: "snippet",
      maxResults: 10,
      pageToken: nextPageToken
    };

    const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/search`, { params });

    this.setState({
      videos: [...this.state.videos, ...data.items], // 무한 로딩이므로 기존의 비디오 데이터에 새로운 데이터 추가
      query,
      nextPageToken: data.nextPageToken
    }); // 없으면 생성 있으면 업데이트

  };

  componentWillMount() { // 렌더링 이전에 실행하고 싶을 때
    this.getYoutubeData('여행');
  }

  setVideo(id) {
    this.setState({ selectedVideo: id })
  }

  // conponentDidMount () {
  //   // render() 이후 실행
  // }

  // setInput (input) {
  //   this.setState({ input });
  // }

  render() {
    const { selectedVideo } = this.state;
    return (
      <div className="App">
        <Nav>
          <SearchBar onSearchVideos={debounce((this.getYoutubeData), 500)} />
        </Nav>
        {
          selectedVideo
            ? <VideoPlayer {...this.state} videoId={selectedVideo} />
            : <InfiniteScroll
              loadMore={() => this.getYoutubeData(this.state.query)}
              hasMore={!!this.state.nextPageToken}
              loader={
                <div key={uuid.v4()} className="loader">
                  <img src={spinner} alt="loading" />
                </div>
              }
            >
              <VideoList
                {...this.state}
                // onVideoSelect={selectedVideo => this.setState({ selectedVideo })} />
                onVideoSelect={this.setVideo} />
            </InfiniteScroll>
        }
      </div>
    );
  }
}

export default App;
