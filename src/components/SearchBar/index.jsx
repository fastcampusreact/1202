import React from 'react';
import './SearchBar.css';

const SearchBar = props => {
  // HOC: High order component
  const handleEvent = search => e => {
    if (e.key === 'Enter') {
      search(e.target.value)
    }
  }
  let input;
  return (
    <div className="search-bar-contain">
      <input
        ref={ref => input = ref}
        type="search"
        // onChange={e => props.onSearchVideos(e.target.value)}
        onKeyPress={handleEvent(props.onSearchVideos)}
        className="input-search"
        placeholder="검색어를 입력해주세요"
        autoFocus
      />
      <button onClick={() => props.onSearchVideos(input.value)} className="btn-search"><i class="fas fa-search"></i>
      </button>
    </div>
  )
};

export default SearchBar;