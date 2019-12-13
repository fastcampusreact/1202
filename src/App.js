import React from 'react';
import uuid from 'uuid';
import axios from 'axios';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';
import Nav from './Components/Nav/Nav';
import SearchBar from './Components/SearchBar'
import { spinner } from './Components/images';
import VideoList from './Components/VideoList';
import VideoPlayer from './Components/VideoPlayer/VideoPlayer';



class App extends React.Component {
  constructor(props) {
    super(props)
    Object.getOwnPropertyNames(App.prototype).forEach(
      key => this[key] = this[key].bind(this)) /**자동으로 바인딩하기위한 함수없었으면 this.getYoutubeData=this.getYoutubeData.bind(this)해야함 */

    this.state = {
      videos: [],//검색 후에 얻어오게되는 비디오들 배열의 형태
      selectedVideos: null,//사용자가 해당하는 결과에서 클릭했을때 ,해당하는 검색결과의 비디오id가 state로 들어가게됨
      query: '',//null로 안하는 이유는 null로 넝어가게됨
      nextPageToken: null
    } /**초기화 비어있는 객체로 초기화 초기화하지않으면 setState하지못함 */

    this.defaultState = this.state;//검색수행을 할때 지금 리액트의 상태 초기화를 위해 construtor(1번만 실행이 된다.)에 백업본 만듬
    //백업본을 만들지않으면 유지보수가 힘들다.백업을 만들면 this.state의 값만을 바꾸면 된다.
  }
  //UPSERT:UPDATE+INSERT
  //getYoutubeData() undefined였을때 여행이 된다.
  async getYoutubeData(query) {
    if (!query) return
    if (this.state.query !== query) {
      this.setState(this.defaultState);//쿼리가 바뀌었을때 ui을 초기화한다.
      //비동기 독립적으로 실행, 렌더함수에 엄데이트된다. 다음 코드 state에 영향을 끼치지않는다.nextPageToken에게
    }

    const { nextPageToken } = this.state;//setSTAete
    //비동기 코드는 무조건 다음 코드에 영향을 주지않는다.
    const params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      // AIzaSyDFjSfrtwzoi9XHarGiQb7RB2x2UEayGIo
      // AIzaSyBSLIjdTd0U9Vqmr_0aJMhuJCbKYyjnq40//내 api.
      q: query,
      part: "snippet",
      maxResults: 10,
      pageToken: nextPageToken,
    }
    const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/search`, { params });

    // console.log(data);

    this.setState({

      videos: [...this.state.videos, ...data.items],//무한 스크롤 때문 기존의 비디오 배열에 추가됨
      query,
      nextPageToken: data.nextPageToken
    });
    /**state에 data가 추가 됨; */
  }
  async componentWillMount() { /**렌더되기 이전에 실행이 된다.*/
    this.getYoutubeData('여행');
  }
  // setInput(input) {//setInput(input)의input은 매개변수로 받고 이는 setState에 의해서 input에 저장 한다.
  //   this.setState({ input });//setState에 의해서 input의 변경의 요청한다.
  // }
  // setVideo(){
  //   this.setState({selectedVideos : id})
  // }
  render() {
    const { selectedVideos } = this.state;
    return (
      <div className="App">
        <Nav>
          <SearchBar  onSearchVideos={debounce(this.getYoutubeData, 500)} />
        </Nav>
        <InfiniteScroll
          // loadMore={() => this.getYoutubeData(this.state.query)}//반드시 화살표함수로 사용해야함,쿼리로 현재상태를 넘긴다.기존상태에있는 쿼리를 넘긴다.
          //실행되는 시점은 사용자가 스크롤바가 끝에 도달하면 로드되어라 데이터를 추가적으로 얻어오는 함수를 실행하게 한다. 검색어가 바뀌지 않고 로드됨 기존 상태의 현재 페이지의 쿼리를 넘긴다.
          hasMore={!!this.state.nextPageToken && !this.state.selectedVideos}//더 페이지를 로드할게 있는지없는지 불리언 타입 nextPageToken는 string이기때문에 !!으로 불리언 타입 변환
          /**단축 평가(&&) 왼쪽이 true 이면 오른쪽을 반환 ,false일 때 반대*/
          /**hasMore은 무조건 true/false리턴 */
          loader={
            <div key={uuid.v4()} className="loader">{/**key을 사용하는 이유는 어떤항목을 변경,추가 또는 삭제할지 식별하는 것을 돕는다.  */}
              <img src={spinner} alt="loading" />
            </div>
          }>
          {
            selectedVideos
              ? <VideoPlayer videoId={selectedVideos} />
              : <VideoList
                {...this.state}//state를 하나하나 입력하기 어렵기 때문에,유지보수와 앞으로 기능이 추가될 전제하에 사용함.
                onVideoSelect={selectedVideos => this.setState({ selectedVideos })}
              />
          }
        </InfiniteScroll>
      </div>
    );
  }
}
export default App;
