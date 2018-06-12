import React, { Component } from "react";
import { connect } from "react-redux";
import { getItem } from "../../ducks/getItemReducer";
import Map from "../GoogleMaps/MapContainer";

class ItemDescription extends Component {
  componentDidMount() {
    //Need to check how to pass params of request into getItem
    this.props.getItem(this.props.match.params.id);
  }

  render() {
    const { item } = this.props;
    return (
      <div>
        <p>{item.user_name}</p>
        <p>{item.item_title}</p>
        <p>{item.item_price}</p>
        <p>{item.item_category}</p>
        <p>{item.item_description}</p>
        <p>{item.item_location}</p>
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{ lat: item.item_lat, lng: item.item_lng }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state.item;
};

export default connect(
  mapStateToProps,
  { getItem }
)(ItemDescription);
