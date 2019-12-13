const axios = require('axios');​
const search = async (query, maxPage) => {
  const results = [];
  const { nextPageToken , items } = data;
  for (const i = 0; i < 10; i++) {
    const params = {
      key : 'AIzaSyCXndE4mNdeCpXWm-7iSu2kUzWuSsliCmc',
      q : query,
      part : 'snippet',
      maxResults: 10,
      pageToken: nextPageToken
    };
    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
    results.push(data.items);
  }
}
const axios=require('axios');
const search=async (query,maxPage)=>{
  const result=[];
  const {nextPageToken,items}=data;
  for(const i=0;i<10;i++){
    const params={
      key:'',
      q:query,
      part:'snippet',
      maxResults:10,
      pageToken:nextPageToken
    };
    const {data}=await axios.get('',{params});
    result.push(data.items);
  }
}


this.setState({vidos:[]},()=>{
  console.log(this.satte);
})//이런 방식으로 콜백함수로 변경을 확인한다.
this.setState({videos:[]});
console.log(this.state);//이 방식으로 변경을 확인하면 안되고

await new Promise((resolve)=>this.setState({vides:[]},resolve))
//비동기 작업은 순서를 확신할 수 없다.

퍼포먼스 최적화 
this.setState({videos:[]})
