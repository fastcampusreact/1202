import React from 'react';
import './index.css';

function SearchBar(props) {
  return (
    <input 
      className="search-bar"
      type="search"
      placeholder="검색어를 입력해주세요"
      onChange={({ target }) => props.onSearch(target.value.trim())}
    />
  );
}

export default SearchBar;