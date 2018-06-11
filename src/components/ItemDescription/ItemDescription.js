import React, { Component } from "react";
import { connect } from "react-redux";
import { getItem } from "../../ducks/itemReducer";

class ItemDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleItem: {}
    };
  }

  componentDidMount() {
    //Need to check how to pass params of request into getItem
    this.props.getItem(this.props.match.params.id);
  }

  render() {
    return <div>{console.log(this.props.items)}</div>;
  }
}
const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getItem }
)(ItemDescription);
