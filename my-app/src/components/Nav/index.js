import React from 'react';

import './index.css';

function Nav(props) {
  return (
    <nav className="navigation">
      {props.children}
    </nav>
  );
}

export default Nav;