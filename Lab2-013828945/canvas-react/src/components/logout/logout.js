import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logOutUser, clearUserProfile } from "../../actions";

import React, { Component } from "react";
class LogOut extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  logOut(e) {
    e.preventDefault();
    this.props.logOutUser(this.props.history);
    this.props.clearUserProfile();
  }
  render() {
    return <button onClick={this.logOut}>LogOut</button>;
  }
}

const mapStateToProps = state => ({
  auth: state.props,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logOutUser, clearUserProfile }
)(withRouter(LogOut));
