import React from 'react';
import './SearchBar.css';

const SearchBar = props => {
  const handlerEnter = search => e => {//파라미터로 2번 받는다.e를 이벤트로 받는 함수를 반환한다.
    if (e.key === 'Enter') {
      search(e.target.value);
    }
  };
  let input;
  return (
    <div className="search-wrapper">
      <input
        //  ref={ref=>{
        //  console.log(ref)
        //   return(input = ref)
        // }}// ref는 input객체 자체를 가져옴.
        ref={ref => (input = ref)}//ref를 받아와서 input에 할당만을 하는 문법이다.
        //ref는 (참조 변수)ref가 받아오는 변수는 input에 접근하기 위한 참조값.
        // ref는 다시 사용하지않고 할당한 input으로만 사용하게 된다.
        type='search'
        // onChange={e => props.setInput(e.target.value)}
        /**e.target.value의 값이 input으로 들어가게 되고,이 값은 setState에 의해 input의 값이 된다.  */
        onKeyPress={handlerEnter(props.onSearchVideos)}
        // onKeyPress={e=>e.key==='Enter'?props.onSearchVideos(e.target.value):()=>{}}//but 권장하는 코딩 방법은 아니다.
        // onkeyPress={e=>{
        //   if(e.key==='Enter'){
        //     props.onSearchVideos(e.target.vlaue);
        //   }
        // }}
        /**props.onSearchVideos(e.target.value)는 query로 들어가게 되고 enterㅇ르 쳤을 때 이 값을 리턴한다. */
        placeholder="검색어를 입력하세요"
        className="inputBox"
      />
      <button onClick={() => props.onSearchVideos(input.value)}>
        {/* onChange에서 setState의 의해 변한 props.input 의 값이 onSearchVideos에 의해 getYouTubeData()의 매개변수로 들어가 쿼리가 된다. */}
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          className="yt-icon"
          style={{
            pointerEvents: "none",
            display: "block",
            width: "30px",
            height: "27px",

          }}>
          <g className="yt-icon">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              className="style-scope yt-icon">
            </path>
          </g>
        </svg>
      </button>
    </div>
  )
}
export default SearchBar;


