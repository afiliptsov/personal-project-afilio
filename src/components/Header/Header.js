import React from "react";
import { Link } from "react-router-dom";
// import "./Header.css";
import hamburger from "../../img/menuImg/ham.svg";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

import logo from "../../img/logo/logo.png";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Link to="/">
          <p className="logoFont">Afili.io</p>
        </Link>
        <input className="search" type="text" placeholder="Search Items" />
        <Link to="/">
          <p className="headerCategories">Home</p>
        </Link>
        {!this.props.user.isAuthed ? null : (
          <Link to="/profile">
            <p className="headerCategories">Profile</p>
          </Link>
        )}
        {!this.props.user.isAuthed ? (
          <a href={process.env.REACT_APP_LOGIN}>
            <p className="headerCategories">Login</p>
          </a>
        ) : (
          <div>
            <a href={process.env.REACT_APP_LOGOUT}>
              <p className="headerCategories">Logout</p>
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
