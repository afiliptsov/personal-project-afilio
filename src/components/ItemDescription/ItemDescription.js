import React, { Component } from "react";
import { connect } from "react-redux";
import { getItem } from "../../ducks/getItemReducer";
import { deleteItem } from "../../ducks/deleteItemReducer";
import { changeItemPriority } from "../../ducks/itemReducer";
import { getUser, reduceCredit } from "../../ducks/userReducer";
import Map from "../GoogleMaps/MapContainer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faEnvelope,
  faPhone,
  faTrashAlt,
  faFire,
  faArrowUp
} from "@fortawesome/fontawesome-free-solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Carousel from "nuka-carousel";
// import "./ItemDescription.css";

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
    window.scrollTo(0, 0);
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
  //TOAST
  error = () =>
    toast("Not enough credits. Add credits in your Profile.", {
      type: toast.TYPE.ERROR,
      autoClose: 4000
    });
  postDeleted = () =>
    toast("Your post has been removed.", {
      type: toast.TYPE.SUCCESS,
      autoClose: 4000
    });
  success = () =>
    toast("You moved your item to priority list", {
      type: toast.TYPE.SUCCESS,
      autoClose: 4000
    });

  render() {
    const style = {
      width: "100%",
      height: "100%"
    };
    const containerStyle = {
      margin: "auto",
      position: "relative",
      width: "80%",
      height: "30vh"
    };

    console.log(this.props);
    const { item } = this.props.item;
    const { user } = this.props.user;

    let getPostId = item.map((curr, i) => {
      return curr.id;
    });

    let getPostUserId = item.map((curr, i) => {
      console.log(curr.user_id);
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
        <div key={i}>
          <img className="desc_image" src={curr.image_url} alt="" />
        </div>
      );
    });
    let itemMap = item.map((curr, i) => {
      return (
        <div className="item details">
          <div className="item__title">
            <div className="delete-button">
              <ToastContainer />
            </div>

            <Carousel
              showArrows={true}
              showStatus={true}
              showThumbs={false}
              width={250}
            >
              {imageMap}
            </Carousel>
          </div>
          <h1 className="item__title">{curr.item_title}</h1>
          <h2 className="item__price">{"$ " + curr.item_price}</h2>
          <h2 className="item__description">Seller:</h2>
          <h2 className="item__condition">{curr.user_name}</h2>
          <h2 className="item__description">Description:</h2>
          <h2 className="item__condition">{curr.item_description}</h2>
          <h2 className="item__location">{curr.item_location}</h2>

          {getPostUserId[0] !== user.id ? (
            <a href={`mailto:${curr.user_email}`}>
              <h2 className="item__email">
                Email
                <FontAwesomeIcon className="descSvg" icon={faEnvelope} />
              </h2>
            </a>
          ) : (
            <div>
              {getPostUserId[0] === user.id &&
              getPostPriority[0] === 0 &&
              !this.state.userHasClickedButton ? (
                <h2
                  className="item__setHighPriority"
                  onClick={() =>
                    this.moveItemToPriorityList(
                      user.credits,
                      user.id,
                      getPostId
                    )
                  }
                >
                  High Priority<FontAwesomeIcon
                    className="descSvg"
                    icon={faArrowUp}
                  />
                </h2>
              ) : getPostPriority[0] !== 0 && getPostUserId[0] === user.id ? (
                <h2 className="item__highPriority">
                  HOT
                  <FontAwesomeIcon className="descSvg" icon={faFire} />
                </h2>
              ) : null}
              {this.state.userHasClickedButton &&
                (this.state.userHasCredits ? (
                  <div>
                    <h2 className="item__highPriority">
                      HOT
                      <FontAwesomeIcon className="descSvg" icon={faFire} />
                    </h2>
                    {i == 0 ? (
                      <div className="display-none">{this.success()}</div>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    <Link to="/profile">
                      <h2 className="item__addCredits">Add Credits</h2>
                    </Link>
                    {i == 0 ? (
                      <div className="display-none">{this.error()}</div>
                    ) : null}
                  </div>
                ))}
            </div>
          )
          //Display else here
          }

          {getPostUserId[0] !== user.id ? (
            <a href={`tel:${curr.user_phone}`}>
              <h2 className="item__call ">
                Call
                <FontAwesomeIcon className="descSvg" icon={faPhone} />
              </h2>
            </a>
          ) : (
            <h2
              className="item__delete"
              onClick={() => {
                this.props.deleteItem(getPostId[0]);
                this.postDeleted();
              }}
            >
              Delete
              <FontAwesomeIcon className="descSvg" icon={faTrashAlt} />
            </h2>
          )}

          <h2 />
          <div className="desc__test-map">
            <Map
              className="Map"
              style={style}
              containerStyle={containerStyle}
              google={this.props.google}
              zoom={11}
              initialCenter={{ lat: curr.item_lat, lng: curr.item_lng }}
            />
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="main-description">{itemMap[0]}</div>
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
  { getItem, getUser, reduceCredit, changeItemPriority, deleteItem }
)(ItemDescription);
