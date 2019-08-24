import React, { Component } from "react";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { getUserProfile, editUserProfile } from "../../actions";

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
      gender: "",
      profileImage: null
    };
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  componentDidMount() {
    this.props.getUserProfile();
    // let userid = cookie.load("userid");
    // axios.defaults.withCredentials = true;
    // axios
    //   .get("http://"+rooturl+":4000/account/profile", {
    //     params: { userid: userid }
    //   })
    //   .then(response => {
    //     this.setState({
    //       ...this.state,
    //       ...response.data
    //     });
    //   });
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
        gender: profile.gender
      });
    }
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
    this.props.editUserProfile(data);
    // axios.defaults.withCredentials = true;
    // axios.put("http://"+rooturl+":4000/account/profile", data, header);
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
        <div>
          <label>Upload profile image</label>
          <input type="file" name="" id="" onChange={this.handleSelectedFile} />
        </div>
        <button type="submit">Update Details</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account
});
export default connect(
  mapStateToProps,
  { getUserProfile, editUserProfile }
)(Account);

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
