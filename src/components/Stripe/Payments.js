import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { getUser, postToken } from "../../ducks/userReducer";
import axios from "axios";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Afili.io"
        description="Add 1 Credit"
        amount={500}
        token={token => {
          this.props.postToken(token);
        }}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY}
      />
    );
  }
}

const mapStateToProps = ({ user }) => ({ ...user });

export default connect(
  mapStateToProps,
  { postToken }
)(Payments);
