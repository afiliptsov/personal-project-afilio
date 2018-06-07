import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import hamburger from "../../img/menuImg/ham.svg";

import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    return (
      <header className="App-header">
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/login">
          <p>Login</p>
        </Link>
        <input type="text" />
        <Link to="/item">
          <p>Item</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
        <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
        <img src={hamburger} alt="hamburger" />
      </header>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Header);
