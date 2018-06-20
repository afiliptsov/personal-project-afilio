import React, { Component } from "react";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

import Item from "../Item/Item";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    console.log(this.props.user.user);
    return (
      <div>
        <div>
          <Item />
        </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser }
)(Home);
