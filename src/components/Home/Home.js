import React, { Component } from "react";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <div>
        {!this.props.isAuthed ? (
          <div>
            <p>You are not logged in</p>
            <a href={process.env.REACT_APP_LOGIN}>
              <button>Login</button>
            </a>
          </div>
        ) : (
          <p>{JSON.stringify(this.props.user)}</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ ...user });

export default connect(
  mapStateToProps,
  { getUser }
)(Home);
