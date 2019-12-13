import React from 'react';
import YoutubeLogo from './images/YouTube.png';
import './Nav.css';

const Nav = props => {
  return (
    <div className="main-nav">
      <img src={YoutubeLogo} alt="Youtube logo"/>
      {props.children}
    </div>
  )
}

export default Nav;