import React from "react";
import { Link } from "react-router-dom";
// import "./Header.css";
import hamburger from "../../img/menuImg/ham.svg";


import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

import logo from '../../img/logo/logo.png'


class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Link to="/">
          <img className="logo"src={logo} alt="logo" />
        </Link>
        <input className="search" type="text" placeholder="Search Items" />
        <Link to="/">
        
          <p>Home</p>
        </Link>
        {!this.props.user.isAuthed ? null : (
          <Link to="/profile">
            <p>Profile</p>
          </Link>
        )}
        {!this.props.user.isAuthed ? (
          <a href={process.env.REACT_APP_LOGIN}>
            <p>Login</p>
          </a>
        ) : (
          <div>
            <a href={process.env.REACT_APP_LOGOUT}>
              <p>Logout</p>
            </a>
          </div>
        )}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { getUser }
)(Header);
