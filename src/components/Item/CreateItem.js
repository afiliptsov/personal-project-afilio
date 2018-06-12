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
import ImgUploader from "../ImageUploader/ImgUploader";
import { Link } from "react-router-dom";

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "default",
      title: "",
      price: 0,
      description: "",
      location: "",
      picture: "",
      lat: 0,
      lng: 0,
      address: "",
      response: 0
    };
    this.createNewListing = this.createNewListing.bind(this);
    this.onChangeHandlerCategory = this.onChangeHandlerCategory.bind(this);
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
  onChangeHandlerPicture(e) {
    this.setState({
      picture: e.target.value
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
        this.state.picture,
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
        <p>category</p>
        <button onClick={() => this.onChangeHandlerCategory("vehicles")}>
          Car
        </button>
        <button onClick={() => this.onChangeHandlerCategory("electronics")}>
          Electronics
        </button>
        <button onClick={() => this.onChangeHandlerCategory("sports")}>
          Sport
        </button>
        <p>title</p>
        <input type="text" onChange={e => this.onChangeHandlerTitle(e)} />
        <p>price</p>
        <input type="text" onChange={e => this.onChangeHandlerPrice(e)} />
        <p>descr</p>
        <input type="text" onChange={e => this.onChangeHandlerDescription(e)} />
        <p>picture</p>
        <input type="text" onChange={e => this.onChangeHandlerPicture(e)} />
        <p />
        <p>location</p>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input"
                })}
              />
              <div className="autocomplete-dropdown-container">
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
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
        <p />
        <button onClick={this.createNewListing} className="submit-application">
          Submit
        </button>
        <p />
        <ImgUploader className="upload-image" postId={this.state.response} />

        <Link to={"/item/" + this.state.response}>
          <button className="post-button">Test</button>
        </Link>

        {console.log(this.props)}
        {console.log("RESPONSE AFTER POST", this.state.response)}
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser, getItems, postItem }
)(CreateItem);
