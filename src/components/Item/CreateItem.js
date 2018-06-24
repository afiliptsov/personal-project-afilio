import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";
import { connect } from "react-redux";
import { getItems, postItem } from "../../ducks/itemReducer";
import { getUser } from "../../ducks/userReducer";
import { getImageByPostId } from "../../ducks/getImageByPostIdReducer";
import ImgUploader from "../ImageUploader/ImgUploader";
import { Route, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { postImage } from "../../ducks/imageReducer";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCar, faTv, faBicycle } from "@fortawesome/fontawesome-free-solid";

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "default",
      title: "",
      price: 0,
      description: "",
      location: "",
      lat: 0,
      lng: 0,
      address: "",
      response: 0,
      showCategory: true
    };
    this.createNewListing = this.createNewListing.bind(this);
    this.onChangeHandlerCategory = this.onChangeHandlerCategory.bind(this);
    this.addDefaultImage = this.addDefaultImage.bind(this);
  }

  componentDidMount() {
    this.props.getItems;
    this.props.getUser;
  }
  handleChange = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ lat: latLng.lat, lng: latLng.lng }))
      .then(() => this.setState({ location: address }))
      .catch(error => console.error("Error", error));
  };

  onChangeHandlerCategory(category) {
    this.setState({ category: category });
  }

  onChangeHandlerTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangeHandlerPrice(e) {
    this.setState({ price: e.target.value });
  }
  onChangeHandlerDescription(e) {
    this.setState({ description: e.target.value });
  }
  onChangeHandlerLocation(e) {
    this.setState({
      location: e.target.value
    });
  }
  changeStateOfCategory() {
    this.setState({ showCategory: !this.state.showCategory });
  }

  addDefaultImage() {
    // console.log(
    //   "ITEMS EXISTS OR NOT",

    // this.props.getImageByPostId(this.state.response).then(response => {
    //   console.log(response.value.data);
    // })
    // );
    this.props.getImageByPostId(this.state.response).then(response => {
      if (response.value.data.length === 0) {
        this.props.postImage(
          this.state.response,
          "https://static.parastorage.com/services/wixapps/2.486.0/javascript/wixapps/apps/blog/images/no-image-icon.png"
        );
      }
    });
  }

  createNewListing() {
    this.props
      .postItem(
        this.props.user.user.id,
        this.state.category,
        this.state.title,
        this.state.price,
        this.state.description,
        this.state.location,
        this.state.lat,
        this.state.lng
      )
      .then(response => {
        this.setState({ response: response.value.data[0].id });
      });
  }

  render() {
    // ADDING LATT LONG
    console.log(this.state.address);

    return (
      <div>
        {this.state.showCategory ? (
          <div>
            <p className="chooseCategory">
              <h2 className="chooseCategoryText">Choose a Category</h2>
            </p>
            <div className="createItemGrid">
              <button
                className={
                  this.state.category === "vehicles"
                    ? "headerButtons active"
                    : " headerButtons "
                }
                onClick={() => this.onChangeHandlerCategory("vehicles")}
              >
                <FontAwesomeIcon className="headerSvg" icon={faCar} />
              </button>

              <button
                className={
                  this.state.category === "electronics"
                    ? "headerButtons active"
                    : " headerButtons"
                }
                onClick={() => this.onChangeHandlerCategory("electronics")}
              >
                <FontAwesomeIcon className="headerSvg" icon={faTv} />
              </button>

              <button
                className={
                  this.state.category === "sports"
                    ? "headerButtons active"
                    : " headerButtons"
                }
                onClick={() => this.onChangeHandlerCategory("sports")}
              >
                <FontAwesomeIcon className="headerSvg" icon={faBicycle} />
              </button>
            </div>
            <div className="postInput">
              <h2>Title:</h2>
              <input
                className="createItem-input"
                type="text"
                onChange={e => this.onChangeHandlerTitle(e)}
              />
              <h2>Price:</h2>
              <input
                className="createItem-input"
                type="text"
                onChange={e => this.onChangeHandlerPrice(e)}
              />

              <h2>Description:</h2>
              <input
                className="createItem-input"
                type="text"
                onChange={e => this.onChangeHandlerDescription(e)}
              />
              <p />
              {console.log(this.state.category)}
              <h2>Location:</h2>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <div className="location">
                    <input
                      className="createItem-input"
                      {...getInputProps({
                        placeholder: "Item Location ...",
                        className: "createItem-input"
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: "#878686",
                              color: "white",
                              cursor: "pointer",
                              fontFamily: "Open Sans",
                              fontSize: "1rem",
                              padding: "3px"
                            }
                          : {
                              backgroundColor: "#fafafa",
                              color: "black",
                              cursor: "pointer",
                              fontFamily: "Open Sans",
                              fontSize: "1rem",
                              padding: "3px"
                            };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
            <p />
            <button
              onClick={() => {
                this.createNewListing();
                this.changeStateOfCategory();
              }}
              className="submit-application"
            >
              Submit
            </button>
          </div>
        ) : (
          <div>
            <ImgUploader
              className="upload-image"
              postId={this.state.response}
            />

            <Link to={"/item/" + this.state.response}>
              <button
                onClick={this.addDefaultImage}
                className="submit-application"
              >
                Create Post
              </button>
            </Link>

            {console.log(this.props)}
            {console.log("RESPONSE AFTER POST", this.state.response)}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser, getItems, postItem, getImageByPostId, postImage }
)(CreateItem);
