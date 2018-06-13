import React, { Component } from "react";
import { connect } from "react-redux";
import { getItem } from "../../ducks/getItemReducer";
import Map from "../GoogleMaps/MapContainer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ItemDescription.css";

class ItemDescription extends Component {
  componentDidMount() {
    //Need to check how to pass params of request into getItem
    this.props
      .getItem(this.props.match.params.id)
      .then(res => console.log(res));
  }

  render() {
    const settings = {
      dots: true,
      accessibility: true,
      adaptiveHeight: true,
      arrows: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2
    };

    const { item } = this.props;
    console.log(item);
    let imageMap = item.map((curr, i) => {
      return (
        <img className="image_description_slider" src={curr.image_url} alt="" />
      );
    });
    let itemMap = item.map((curr, i) => {
      return (
        <div>
          <p>{curr.user_name}</p>
          <p>{curr.item_title}</p>
          <p>{curr.item_price}</p>
          <p>{curr.item_category}</p>
          <p>{curr.item_description}</p>
          <p>{curr.item_location}</p>
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={{ lat: curr.item_lat, lng: curr.item_lng }}
          />
        </div>
      );
    });
    return (
      <div>
        {itemMap.values().next().value}
        <div className="image_description-carousel">
          <Slider {...settings}>{imageMap}</Slider>
        </div>
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
