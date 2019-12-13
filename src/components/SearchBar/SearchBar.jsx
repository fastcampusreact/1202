import React from "react"
import "./SearchBar.css"


const SearchBar = (props) => {

  const handleEnter = (search) => (e) => {
    if (e.key === "Enter") search(e.target.value)
  }

  let input; // input value를 가져오기 위해 선언
  return (
    <div className="search">
      <input
        ref={ref => {
          console.log(ref)
          return (input = ref)
        }
        }
        type="search"
        placeholder="보노보노보노보노보노보노보노보노보노보노보노"
        onChange={(e) => props.onSearchVideos(e.target.value)} // 완성 되면 0.5초 뒤 자동 검색(debounce)
        onKeyPress={handleEnter(props.onSearchVideos)} // Enter 누르면 검색
      />
      <button className="search-btn" onClick={() => props.onSearchVideos(input.value)}> {/* 버튼 누르면 검색 */}
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          style={{
            pointerEvents: "none",
            display: "block",
            width: "100%",
            height: "100%"
          }}
          className="style-scope yt-icon"
        >
          <g className="style-scope yt-icon">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              className="style-scope yt-icon"
            />
          </g>
        </svg>
      </button>
    </div>
  )
}

export default SearchBar
