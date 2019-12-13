import React from 'react';

import './index.css'
import { logo } from './images'

function Logo(props) {
  return (
    <h2 className="logo">
      <img src={logo} alt="유튜브 로고" />
    </h2>
  );
}

export default Logo;