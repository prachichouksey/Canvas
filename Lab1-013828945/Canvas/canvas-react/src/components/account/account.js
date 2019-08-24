import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",

      email: "",
      phonenumber: "",
      aboutme: "",
      city: "",
      country: "",
      company: "",
      school: "",
      language: "",
      hometown: "",
      gender: "",
      profileImage: null
    };
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  componentDidMount() {
    let userid = cookie.load("userid");
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:4000/account/profile", {
        params: { userid: userid }
      })
      .then(response => {
        this.setState({
          ...this.state,
          ...response.data
        });
      });
  }

  changeHandler = (name, e) => {
    this.setState({
      [name]: e.target.value
    });
  };

  handleSelectedFile(event) {
    getBase64(event.target.files[0]).then(data =>
      this.setState({
        profileImage: data
      })
    );
  }

  submitProfile = e => {
    e.preventDefault();
    var header = { "Content-Type": "application/JSON" };
    let userid = cookie.load("userid");
    const data = {
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
      profileImage: this.state.profileImage,
      userid: userid
    };

    axios.defaults.withCredentials = true;
    axios.put("http://localhost:4000/account/profile", data, header);
  };

  render() {
    return (
      <form onSubmit={this.submitProfile}>
        <h2>Edit Profile</h2>
        <p>Please update your details</p>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder={this.state.username}
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
        <div>
          <label>Upload profile image</label>
          <input type="file" name="" id="" onChange={this.handleSelectedFile} />
        </div>
        <button type="submit">Update Details</button>
      </form>
    );
  }
}

export default Account;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
