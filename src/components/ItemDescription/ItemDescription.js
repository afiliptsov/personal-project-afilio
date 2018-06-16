import React, { Component } from "react";
import { connect } from "react-redux";
import { getItem } from "../../ducks/getItemReducer";
import { changeItemPriority } from "../../ducks/itemReducer";
import { getUser, reduceCredit } from "../../ducks/userReducer";
import Map from "../GoogleMaps/MapContainer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ItemDescription.css";

class ItemDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userHasClickedButton: false,
      userHasCredits: false
    };

    this.moveItemToPriorityList = this.moveItemToPriorityList.bind(this);
  }
  componentDidMount() {
    //Need to check how to pass params of request into getItem
    this.props
      .getItem(this.props.match.params.id)
      .then(res => console.log(res));
    this.props.getUser().then(response => console.log(response));
  }

  moveItemToPriorityList(credits, userId, postId) {
    this.setState({ userHasClickedButton: true, userHasCredits: credits > 0 });
    console.log(credits, userId, postId);
    if (credits > 0) {
      reduceCredit(userId);
      changeItemPriority(postId);
    }
  }
  render() {
    console.log(this.props);
    const { item } = this.props.item;
    const { user } = this.props.user;

    let getPostId = item.map((curr, i) => {
      return curr.id;
    });

    let getPostUserId = item.map((curr, i) => {
      return curr.user_id;
    });

    let getPostPriority = item.map((curr, i) => {
      return curr.priority;
    });

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

    console.log(this.props.getUser);

    let imageMap = item.map((curr, i) => {
      return (
        <img
          key={i}
          className="image_description_slider"
          src={curr.image_url}
          alt=""
        />
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
        {console.log(user)}

        {getPostUserId[0] === user.id &&
        getPostPriority[0] === 0 &&
        !this.state.userHasClickedButton ? (
          <div>
            Set High Priority
            {console.log(getPostPriority[0])}
            <button
              onClick={() =>
                this.moveItemToPriorityList(user.credits, user.id, getPostId)
              }
            >
              Set High Priority
            </button>
          </div>
        ) : getPostPriority[0] !== 0 && getPostUserId[0] === user.id ? (
          <div>Your post already have High Priority</div>
        ) : null}

        {this.state.userHasClickedButton &&
          (this.state.userHasCredits ? (
            <div>You used your credit to move this post to Priority list</div>
          ) : (
            <div>
              <button>NOT ENOUGH CREDITS</button>
              Not enough credits. Add some credits in Profile
              {console.log("NO CREDITS")}
            </div>
          ))}
        {itemMap.values().next().value}
        <div className="image_description-carousel">
          <Slider {...settings}>{imageMap}</Slider>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  item: state.item,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getItem, getUser, reduceCredit, changeItemPriority }
)(ItemDescription);
