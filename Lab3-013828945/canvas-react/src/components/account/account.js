import React, { Component } from "react";
import cookie from "react-cookies";
import { connect } from "react-redux";
//import { getUserProfile, editUserProfile } from "../../actions";
import { graphql } from "react-apollo";
import { updateProfileMutation, profile } from "../../queries/queries";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phonenumber: "",
      aboutme: "",
      city: "",
      country: "",
      company: "",
      school: "",
      language: "",
      hometown: "",
      gender: ""
    };
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  componentDidMount() {
    let userid = cookie.load("userid");

    this.props.client
      .query({
        query: profile,
        variables: {
          userid: userid
        }
      })
      .then(response => {
        console.log("Response", response);
        this.setState({
          ...this.state,
          ...response.data.profile.userData
        });
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.account.profile) {
      let profile = nextProps.account.profile;
      this.setState({
        name: profile.name,
        email: profile.email,
        phonenumber: profile.phonenumber,
        aboutme: profile.aboutme,
        city: profile.city,
        country: profile.country,
        company: profile.company,
        school: profile.school,
        language: profile.language,
        hometown: profile.hometown,
        gender: profile.gender,
        status: false
      });
    }
  }
  changeHandler = (name, e) => {
    this.setState({
      [name]: e.target.value
    });
  };

  submitProfile = e => {
    e.preventDefault();
    let userid = cookie.load("userid");
    this.props
      .updateProfileMutation({
        variables: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          phonenumber: this.state.phonenumber,
          aboutme: this.state.aboutme,
          city: this.state.city,
          country: this.state.country,
          company: this.state.company,
          school: this.state.school,
          language: this.state.language,
          hometown: this.state.hometown,
          gender: this.state.gender,
          userid: userid
        }
      })
      .then(response => {});
  };

  render() {
    return (
      <form onSubmit={this.submitProfile}>
        <h2>Profile</h2>
        <p>View/Update your details</p>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder={this.state.name}
            pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$"
            onChange={this.changeHandler.bind(this, "username")}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            placeholder={this.state.password}
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            onChange={this.changeHandler.bind(this, "password")}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder={this.state.email}
            onChange={this.changeHandler.bind(this, "email")}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            placeholder={this.state.phonenumber}
            pattern="\d{3}[\-]\d{3}[\-]\d{4}"
            onChange={this.changeHandler.bind(this, "phonenumber")}
          />
        </div>
        <div>
          <label>About Me</label>
          <textarea
            type="text"
            name="aboutme"
            placeholder={this.state.aboutme}
            onChange={this.changeHandler.bind(this, "aboutme")}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder={this.state.city}
            onChange={this.changeHandler.bind(this, "city")}
          />
        </div>
        <div>
          <label>Country</label>
          <input
            type="text"
            name="country"
            placeholder={this.state.country}
            onChange={this.changeHandler.bind(this, "country")}
          />
        </div>
        <div>
          <label>Company</label>
          <input
            type="text"
            name="company"
            placeholder={this.state.company}
            onChange={this.changeHandler.bind(this, "company")}
          />
        </div>
        <div>
          <label>School</label>
          <input
            type="text"
            name="school"
            placeholder={this.state.school}
            onChange={this.changeHandler.bind(this, "school")}
          />
        </div>
        <div>
          <label>Language</label>
          <input
            type="text"
            name="language"
            placeholder={this.state.language}
            onChange={this.changeHandler.bind(this, "language")}
          />
        </div>
        <div>
          <label>Hometown</label>
          <input
            type="text"
            name="hometown"
            placeholder={this.state.hometown}
            onChange={this.changeHandler.bind(this, "hometown")}
          />
        </div>
        <div>
          <label>
            Gender
            <input
              type="radio"
              name="gender"
              value="Male"
              checked
              onChange={this.changeHandler.bind(this, "gender")}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={this.changeHandler.bind(this, "gender")}
            />
            Female
          </label>
        </div>
        <button type="submit">Update Details</button>
      </form>
    );
  }
}

export default graphql(updateProfileMutation, {
  name: "updateProfileMutation"
})(Account);
