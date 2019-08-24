import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import rooturl from "../config/urlConfig";
/**
 * @return {null}
 */
class CreateAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "",
      content: "",
      status: false
    };
    this.submitAnnouncement = this.submitAnnouncement.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler = (name, e) => {
    this.setState({
      [name]: e.target.value
    });
  };
  submitAnnouncement(e) {
    e.preventDefault();
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    axios
      .post("http://" + rooturl + ":4000/announcement/create", {
        courseid: this.props.courseid,
        heading: this.state.heading,
        details: this.state.content,
        dateCreated: date,
        userid: cookie.load("userid")
      })
      .then(response => {
        response.status === 200 && this.setState({ status: response.data });
      });
  }

  render() {
    return (
      <div className="col-3">
        <h4>Create Announcement</h4>
        <div style={{ textAlign: "right" }} onClick={this.props.onClose}>
          X
        </div>
        <form onSubmit={this.submitAnnouncement}>
          <div>
            <label>Heading</label>
            <input
              type="text"
              name="heading"
              onChange={this.changeHandler.bind(this, "heading")}
            />
          </div>
          <div>
            <label>Content</label>
            <input
              type="text"
              name="content"
              onChange={this.changeHandler.bind(this, "content")}
            />
          </div>
          <div>
            <button type="submit">Create Announcement</button>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateAnnouncement;
