import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
//Stateless component
class App extends React.Component {
  constructor (props) {
    super(props)//this에 접근하기 위해 (상위 컴포넌트 props에 점근하기 위해)
    this.state = {
      counter: 0,
      className:"App-header-2"
    }//상태가 있는 컴포너트
    // this.add=this.add.bind(this);
    // this.minus=this.minus.bind(this);
    Object.keys(this).forEach(key => {
      if(typeof this[key]==='function'){
        this[key]=this[key].bind(this)
      }
    })
  }
  componentDidMount(){
    setInterval(()=>this.setState({
      counter: this.state.counter + 1
    }),1000)
  }  
  calc(val){
    console.log(this);
    this.setState({counter:this.state.counter +val})
  }
  // add(val){
  //   this.setState({counter:this.state.counter +val})
  // }
  // minus(val1){
  //   this.setState({counter:this.state.counter -val1})
  // }
  render(){
    return (
      <div className="App">
        <button onClick={this.calc.bind(this)}>+</button>{this.state.counter}
        <button onClick={() => this.calc(-50)}>-</button>
      </div>
    );
  }
}
export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.add = this.add.bind(this);
    
    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this))
  }
  state = {}
   async getYoutubeData(query='travel') {
    const data =await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA&q=${query}&part=snippet&pageToken=CAoQAA`);
    this.setState({ data },()=>{
      console.log(data)
    })
  }
  add () {
    this.setState({name : 'hi'}, () => {
      console.log(this.state.name) //1
    })
    console.log(this.state.name) //2
  }
  
  render () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" onClick={this.add} />
        {this.state.name}<button onClick={this.add}>aa</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}
export default App;





import React from 'react';
import './App.css';
import axios from 'axios';
import Nav from './Components/Nav/Nav';
import SearchBar from './Components/SearchBar'
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import uuid from 'uuid';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {} /**초기화 비어있는 객체로 초기화 초기화학지않으면 setState하지못함 */
    this.add = this.add.bind(this);

    Object.getOwnPropertyNames(App.prototype).forEach(
      key => this[key] = this[key].bind(this)) /**자동으로 바인딩하기위한 함수없었으면 this.getYoutubeData=this.getYoutubeData.bind(this)해야함 */

    this.state = {
      vidios: [],
      selectorVideos: null,
      query: '',
      nextPageToken: null
    }
  }


  //UPSERT:UPDATE+INSERT
  //getYoutubeData() undefined였을때 여행이 된다.
  async getYoutubeData(query) {


    const { nextPageToken } = this.state;
    const params = {
      key: '',
      q: query,
      part: 'snippet',
      maxResult: 10,
      pageToken: nextPageToken,
    }

    try {
      const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
      this.setState({ data })//state에 data가 추가 됨;
    } catch (err) {
      //
    }

    componentWillMount(){
      this.getYoutubeData('여행');
    }

    setInput(input){
      this.setInput({ input });
    }

  }
  render() {
    return (
      <div className="App">
        <Nav>
          <SearchBar input={input} setInput={this.setInput} onSearchVideos={debounce(this.getYoutubeData, 500)}
          />
        </Nav>
        <InfiniteScroll
          loadMore={() => this.getYoutubeData(this.state.query)}
          hasMore={!!this.state.nextPageToken && !this.state.seletedVideo}
          loader={
            <div key={uuid.v4()} className=""> {/**uuid version4 은 가장 안전한 방법 */}
              <img />
            </div>
          }
        >
          <VideoList
          />
          <InfiniteScroll />
      </div>
        );
      }
    }
export default App;