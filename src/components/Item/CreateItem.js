import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, postItem } from "../../ducks/itemReducer";
import { getUser } from "../../ducks/userReducer";

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
      lng: 0
    };
    this.createNewListing = this.createNewListing.bind(this);
    this.onChangeHandlerCategory = this.onChangeHandlerCategory.bind(this);
  }

  componentDidMount() {
    this.props.getItems;
    this.props.getUser;
  }

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
  onChangeHandlerLat(e) {
    this.setState({
      lat: e.target.value
    });
  }
  onChangeHandlerLng(e) {
    this.setState({
      lng: e.target.value
    });
  }
  onChangeHandlerPicture(e) {
    this.setState({
      picture: e.target.value
    });
  }

  createNewListing() {
    this.props.postItem(
      this.props.user.user.id,
      this.state.category,
      this.state.title,
      this.state.price,
      this.state.description,
      this.state.location,
      this.state.picture,
      this.state.lat,
      this.state.lng
    );
  }

  render() {
    return (
      <div>
        {console.log(this.props.user.user.id)}
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
        <p>location</p>
        <input type="text" onChange={e => this.onChangeHandlerLocation(e)} />
        <p>picture</p>
        <input type="text" onChange={e => this.onChangeHandlerPicture(e)} />
        <p />

        <p>Lat</p>
        <input type="text" onChange={e => this.onChangeHandlerLat(e)} />

        <p>Lng</p>
        <input type="text" onChange={e => this.onChangeHandlerLng(e)} />
        <p />
        <button onClick={this.createNewListing}>Submit</button>
        {console.log(this.props)}
        {console.log("LAT", this.state.lat)}
        {console.log("LNG", this.state.lng)}
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser, getItems, postItem }
)(CreateItem);
