// node modules
import React, { Component } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import uuid from 'uuid';

// react components
import './App.css';
import Nav from './components/Nav';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoListItem from './components/VideoListItem';
import VideoPlayer from './components/VideoPlayer';
import InfiniteScroll from 'react-infinite-scroller';
import spinner from './components/images/spinner.gif'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      videoList: [],
      nextPageToken: null,
      selectedVideoId: null,
    };
    this.defaultState = this.state;
    this.getYoutube = this.getYoutube.bind(this);
    this.setVideoId = this.setVideoId.bind(this);
  }

  componentWillMount() {
    this.getYoutube('여행');
  }

  async getYoutube(query) {
    // trim한 검색어가 ''라면 return
    if (!query) return;

    // 이전 검색 결과와 다를시 상태 초기화
    if (query !== this.state.query) {
      this.setState(this.defaultState);
    }

    try {
      // 질문 - pageToken이 null이면 암묵적으로 첫 페이지를 반환?
      // key 설정 - process.env 까지는 예약어 + REACT_APP_까지도 예약어
      // .env에서 설정
      // .gitignore에서 .env를 추가
      const params = {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        q: query,
        part: 'snippet',
        pageToken: this.state.nextPageToken,
        maxResults: 10
      };

      const { data } = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        { params }
      );
      // console.dir(data);

      // 반환된 검색 결과에 맞게 상태를 업데이트
      this.setState(state => ({
        query,
        videoList: [...state.videoList, ...data.items],
        nextPageToken: data.nextPageToken
      }));
    } catch(e) {
      console.error(e);
    }
  }

  // 선택된 비디오 id에 맞게 상태를 업데이트
  setVideoId(id) {
    this.setState({ selectedVideoId: id });
  }

  render() {
    const { selectedVideoId, videoList } = this.state;
    return (
      <>
      <header className="header">
        <Nav>
          <Logo />
          <SearchBar onSearch={debounce(this.getYoutube, 500)} />
        </Nav>
      </header>
      <main className="main-content">
        {
          selectedVideoId
          ? <VideoPlayer 
              videoId={selectedVideoId} 
              info={
                videoList.filter(item => item.id.videoId === selectedVideoId)
              }
            />
          : <InfiniteScroll
              loadMore={() => this.getYoutube(this.state.query)}
              hasMore={!!this.state.nextPageToken}
              loader={
                <div key={uuid.v4()} className="loader">
                  <img src={spinner} alt="loading" />
                </div>
              }
            >
              <VideoList>
                {videoList.map(item => {
                  return (
                    <VideoListItem
                      {...item}
                      key={item.id.videoId}
                      id={item.id.videoId}
                      onSelect={this.setVideoId}
                    />
                  );
                })}
              </VideoList>
            </InfiniteScroll>
        }
      </main>
      </>
    );
  }
}

export default App;