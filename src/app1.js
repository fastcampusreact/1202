// const getPrice = percent => price => (1 - percent) * price

// const tenPercentOff = getPrice(0.1);
// const twentyPercentOff = getPrice(0.2);

// const price1 = tenPercentOff(10000);
// const price2 = twentyPercentOff(10000);

// list.filter(item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase()));



import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    // this.getYoutubeData = this.getYoutubeData.bind(this);
    this.sort = this.sort.bind(this);

  }
  async getYoutubeData(target, keyCode) {
    const text = target.value.trim();
    if (!text || keyCode !== 13) return;
    try {
      target.value = '';
      const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA&q=${text}&part=snippet&pageToken=CA8QAA`;
      const res = await axios.get(url);
      // console.log(res);
      // console.log(res.data.items);
      this.setState({ list: res.data.items });
    } catch (e) {
      console.error(e);
    }
  }
  sort() {
    this.setState({ list: this.state.list.reverse() });
  }
  render() {
    return (
      <div className="App">
        <input placeholder="검색어를 입력하세요." onKeyUp={({ target, keyCode }) => this.getYoutubeData(target, keyCode)} />
        <div>
          {this.state.list.map(item => {
            return <div key={item.id.videoId}>{item.snippet.title}</div>;
          })}
        </div>
        <button onClick={this.sort}>Sort</button>
      </div>
    );
  }
}
export default App;

import React,{Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[]
    }
    this.sort=this.sort.bind(this);
  }
  async getYoutubeData(target,keyCode){
    const text=target.value.trim();
    if(!text || keyCode!==13)return;
    try{
      target.value='';
      const url=``;
      const res=await axios.get(url);
    }catch(e){
      console.error(e);
    }
  }
  sort(){
    this.setState({
      list:this.state.list.reverse()
    });
    render(){
      return (
        <div className="App">
          <input placeholder="검색어를 입력하세요" onKeyUp={({target,keyCode})=>this.getYoutubeData(target,keyCode})}/>
          <div>
            {this.state.list.map(item=>{
              return <div key={item.id.videoId}>{item.snippet.title}</div>
            })}
          </div>
          <button onClick={this.sort}></button>

        </div>
      )
  }
}}
export default App;
