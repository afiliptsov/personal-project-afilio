import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, postToken, reduceCredit } from "../../ducks/userReducer";
import axios from "axios";
import Payments from "../Stripe/Payments";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/fontawesome-free-solid";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: this.props.user.user_name,
      user_phone: this.props.user.user_phone,
      user_email: this.props.user.user_email,
      profile_edit: false
    };
    this.onChangeHandlerEmail = this.onChangeHandlerEmail.bind(this);
    this.onChangeHandlerPhone = this.onChangeHandlerPhone.bind(this);
    this.onChangeHandlerName = this.onChangeHandlerName.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
  }
  onChangeHandlerPhone(e) {
    this.setState({ user_phone: e.target.value });
  }
  onChangeHandlerName(e) {
    this.setState({ user_name: e.target.value });
  }
  onChangeHandlerEmail(e) {
    this.setState({ user_email: e.target.value });
  }
  enableEdit() {
    return this.setState({
      profile_edit: !this.state.profile_edit
    });
  }

  reduceCredit(id) {
    this.props.reduceCredit(id);
  }

  saveProfile(id) {
    let newProfile = {
      user_phone:
        this.state.user_phone.length > 0 && this.state.user_phone !== " "
          ? this.state.user_phone
          : this.props.user.user_phone,
      user_name:
        this.state.user_name.length > 0 && this.state.user_name !== " "
          ? this.state.user_name
          : this.props.user.user_name,
      user_email:
        this.state.user_email.length > 0 && this.state.user_email !== " "
          ? this.state.user_email
          : this.props.user.user_email
    };
    axios.put(`/api/profile/${id}`, newProfile);
    return this.setState({
      profile_edit: !this.state.profile_edit
    });
  }

  render() {
    return (
      <div className="profile-grid">
        <img
          className="circle-profile"
          src={this.props.user.user_avatar}
          alt="avatar"
        />
        <input
          className="profile-item"
          type="text"
          value={this.state.user_name}
          onChange={e => this.onChangeHandlerName(e)}
          onBlur={() => this.saveProfile(this.props.user.id)}
        />
        <input
          className="profile-item"
          type="text"
          value={this.state.user_email}
          onChange={e => this.onChangeHandlerEmail(e)}
          onBlur={() => this.saveProfile(this.props.user.id)}
        />
        <input
          className="profile-item"
          type="text"
          value={this.state.user_phone}
          onChange={e => this.onChangeHandlerPhone(e)}
          onBlur={() => this.saveProfile(this.props.user.id)}
        />

        <h3 className="profile-item">
          <div className="credits">
            <h3>Credits:</h3>
            <div className="fire">
              {this.props.user.credits}
              <FontAwesomeIcon className="descSvg" icon={faFire} />
            </div>
          </div>
        </h3>
        <Payments />
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({ ...user });

export default connect(
  mapStateToProps,
  { getUser, postToken, reduceCredit }
)(Profile);
