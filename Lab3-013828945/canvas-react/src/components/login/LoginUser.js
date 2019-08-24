import React, { Component } from "react";
import sjsu from "../../images/sjsu.png";
import university from "../../images/Sjsu-university.png";
import "../../styles/LoginUser.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import { logInUser, closeError } from "../../actions";
import Modal from "./../../library/modal/modal";
import { withApollo } from "react-apollo";
import { login } from "../../queries/queries";
import swal from "sweetalert";
class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: "",
      password: "",
      error: ""
    };

    this.useridChangeHandler = this.useridChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  useridChangeHandler = e => {
    this.setState({
      userid: e.target.value
    });
  };

  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  submitLogin = e => {
    e.preventDefault();
    // var header = { "Content-Type": "application/JSON" };
    // const data = {
    //   userid: this.state.userid,
    //   password: this.state.password
    // };
    //this.props.logInUser(data, this.props.history);
    console.log(this.state);
    this.props.client
      .query({
        query: login,
        variables: {
          userid: this.state.userid,
          password: this.state.password
        }
      })
      .then(response => {
        console.log("Response", response);
        if (!response.data.login.success) {
          swal("Invalid Credentials", "error");
          this.props.history.push("/login");
        } else {
          localStorage.setItem("type", response.data.login.userData.type);
          document.cookie = "userid=" + response.data.login.userData.userId;
        }
      });
  };

  handleToggle() {
    //  this.props.dispatch(closeError());
  }

  render() {
    //const { errors } = this.state;
    return (
      <div className="Login">
        <div className="LoginBanner">
          <div className="Banner-Connecting">
            <h1>
              Connecting to
              <img className="LoginImage" src={sjsu} alt="Connecting to SJSU" />
            </h1>
          </div>
        </div>
        <div className="SignIn-Container">
          <div className="UnivLogo-Container">
            <img src={university} alt="San Jose State University" />
          </div>
          <div className="signin-form">
            <h2>Sign In</h2>
            {this.state.error ? "Invalid details" : <p />}
            <div>
              <input
                className="input-field"
                onChange={this.useridChangeHandler}
                type="text"
                name="username"
                placeholder="SJSU ID Number"
                required
                pattern="[0-9]{5-9}"
              />

              <input
                className="input-field"
                onChange={this.passwordChangeHandler}
                type="password"
                name="password"
                required
                pattern="{5-9}"
                placeholder="Password"
              />
              <Link to="/signup">
                <h3>Sign Up?</h3>
              </Link>
            </div>
            <button className="button" onClick={this.submitLogin}>
              SignIn
            </button>
          </div>
        </div>
        <Modal
          onClose={this.handleToggle.bind(this)}
          open={this.state.modalOpen}
        />
      </div>
    );
  }
}

export default withApollo(LoginUser);
