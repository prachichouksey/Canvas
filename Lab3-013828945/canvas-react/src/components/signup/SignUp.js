import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import { signUpUser } from "../../actions";
import { withRouter } from "react-router-dom";
import { graphql } from "react-apollo";
import { signUpMutation } from "../../queries/queries";
import swal from "sweetalert";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      type: "Student",
      signedup: "",
      userid: "",
      errors: {}
    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.typeChangeHandler = this.typeChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };

  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  typeChangeHandler = e => {
    this.setState({
      type: e.target.value
    });
  };

  submitLogin = e => {
    e.preventDefault();
    this.props
      .signUpMutation({
        variables: {
          name: this.state.username,
          type: this.state.type,
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(response => {
        if (response.data.signUpUser.success) {
          this.setState({
            signedup: true
          });
          this.setState({
            userid: response.data.signUpUser.userData.userId
          });
          swal(
            "Your new user id is " + response.data.signUpUser.userData.userId
          );
        } else {
          this.setState({
            signedup: false
          });
        }
      });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  render() {
    if (this.state.signedup === true) {
      return <Redirect to="/canvas" />;
    } else {
      return (
        <form
          style={{
            width: "300px",
            "text-align": "center",
            margin: "60px auto",
            border: "1px solid #aaa",
            borderRadius: "4px"
          }}
          onSubmit={this.submitLogin}
        >
          <h2>Sign Up</h2>
          <p>Please enter your details</p>
          {this.state.signedup === false && (
            <p>Incorrect Details. Please try again</p>
          )}
          <input
            style={inputStyle}
            onChange={this.usernameChangeHandler}
            type="text"
            name="username"
            placeholder="Username"
            required
            pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$"
          />

          <input
            style={inputStyle}
            onChange={this.passwordChangeHandler}
            type="password"
            name="password"
            placeholder="Password"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
          />

          <input
            style={inputStyle}
            onChange={this.emailChangeHandler}
            type="email"
            name="email"
            placeholder="EmailId"
            required
          />
          <div>
            <select
              style={inputStyle}
              onChange={this.typeChangeHandler}
              name="type"
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
            </select>
          </div>
          <button style={inputStyle} type="submit">
            SignUp
          </button>
        </form>
      );
    }
  }
}

const inputStyle = {
  margin: "0 0 10px 0",
  border: "0.5px solid #dedede",
  padding: "10px",
  borderRadius: "2px"
};

export default graphql(signUpMutation, { name: "signUpMutation" })(SignUp);
