import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_phone: this.props.user.user_phone,
      user_avatar: this.props.user.user_avatar,
      user_address: this.props.user.user_address,
      profile_edit: false
    };
    this.onChangeHandlerAvatar = this.onChangeHandlerAvatar.bind(this);
    this.onChangeHandlerPhone = this.onChangeHandlerPhone.bind(this);
    this.onChangeHandlerAddress = this.onChangeHandlerAddress.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
  }
  onChangeHandlerAvatar(e) {
    this.setState({ user_avatar: e.target.value });
  }
  onChangeHandlerPhone(e) {
    this.setState({ user_phone: e.target.value });
  }
  onChangeHandlerAddress(e) {
    this.setState({ user_address: e.target.value });
  }
  enableEdit() {
    return this.setState({
      profile_edit: !this.state.profile_edit
    });
  }
  saveProfile(id) {
    let newProfile = {
      user_phone: this.state.user_phone,
      user_avatar: this.state.user_avatar,
      user_address: this.state.user_address
    };
    axios.put(`/api/profile/${id}`, newProfile);
    return this.setState({
      profile_edit: !this.state.profile_edit
    });
  }

  render() {
    console.log(this.props.getUser);
    console.log();
    let editEnabled = (
      <div>
        <p>{this.props.user.user_name}</p>
        <p>
          <input
            type="text"
            placeholder="Phone"
            onChange={e => this.onChangeHandlerPhone(e)}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Avatar"
            onChange={e => this.onChangeHandlerAvatar(e)}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Address"
            onChange={e => this.onChangeHandlerAddress(e)}
          />
        </p>
        <p>
          <button onClick={id => this.saveProfile(this.props.user.id)}>
            Save
          </button>
        </p>
      </div>
    );
    let editDisabled = (
      <div>
        <p>{this.props.user.user_name}</p>
        <p>{this.props.user.user_phone}</p>
        <img src={this.props.user.user_avatar} alt="" />
        <p>{this.props.user.user_address}</p>
        <button onClick={this.enableEdit}>Edit</button>
      </div>
    );

    return <div>{!this.state.profile_edit ? editDisabled : editEnabled}</div>;
  }
}
const mapStateToProps = ({ user }) => ({ ...user });

export default connect(
  mapStateToProps,
  { getUser }
)(Profile);
