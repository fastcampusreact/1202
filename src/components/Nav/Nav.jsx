import React from "react"
import logo from "./images/logo.png"
import bono from "./images/bono.png"
import "./Nav.css"

const Nav = (props) => {

  return (
    <nav className="navigation">
      <img className="logo" src={logo} alt="Youtube logo" />
      {props.children}
      <img className="deco" src={bono} alt="Bonobono decoration" />
    </nav>
  )
}

export default Nav
