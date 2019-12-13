import React from 'react';
import './Nav.css';
import YouTubeLogo from './images/YouTubeLogo.png';


const Nav = props => {
  return (
    <div className="menu">
      <nav className="menu-nav">
        <a href="http://www.youtube.com">
          <img src={YouTubeLogo} alt='YouTubeLogo' className="YouTubeLogo"/>
        </a>
        {props.children}
      </nav>
    </div>
  )
}
export default Nav;
