import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseid: "",
      name: "",
      department: "",
      description: "",
      room: "",
      capacity: "",
      waitlist: "",
      term: "",
      userid: "",
      status: ""
    };

    this.submitCourse = this.submitCourse.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler = (name, e) => {
    this.setState({
      [name]: e.target.value
    });
  };

  submitCourse = e => {
    e.preventDefault();
    var header = { "Content-Type": "application/JSON" };
    let userid = cookie.load("userid");
    const data = {
      courseid: this.state.courseid,
      name: this.state.name,
      department: this.state.department,
      description: this.state.description,
      room: this.state.room,
      capacity: this.state.capacity,
      waitlist: this.state.waitlist,
      term: this.state.term,
      userid: userid
    };

    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:4000/course/create", data, header)
      .then(response => {
        if (response.status === 200) {
          this.setState({ status: "Success" });
        } else {
          this.setState({ status: "Error in creating course" });
        }
      });
  };

  render() {
    return this.state.status ? (
      <div>{this.state.status}</div>
    ) : (
      <form onSubmit={this.submitCourse}>
        <h2>Create Course</h2>
        <p>Please enter course details</p>
        <div>
          <label>Course Id</label>
          <input
            type="text"
            name="courseid"
            placeholder={this.state.courseid}
            onChange={this.changeHandler.bind(this, "courseid")}
          />
        </div>
        <div>
          <label>Course Name</label>
          <input
            type="text"
            name="name"
            placeholder={this.state.name}
            onChange={this.changeHandler.bind(this, "name")}
          />
        </div>
        <div>
          <label>Department</label>
          <input
            type="text"
            name="department"
            placeholder={this.state.department}
            onChange={this.changeHandler.bind(this, "department")}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder={this.state.description}
            onChange={this.changeHandler.bind(this, "description")}
          />
        </div>
        <div>
          <label>Room</label>
          <input
            type="text"
            name="room"
            placeholder={this.state.room}
            onChange={this.changeHandler.bind(this, "room")}
          />
        </div>
        <div>
          <label>Capacity</label>
          <input
            type="text"
            name="capacity"
            placeholder={this.state.capacity}
            onChange={this.changeHandler.bind(this, "capacity")}
          />
        </div>
        <div>
          <label>Waitlist</label>
          <input
            type="text"
            name="waitlist"
            placeholder={this.state.waitlist}
            onChange={this.changeHandler.bind(this, "waitlist")}
          />
        </div>
        <div>
          <label>Term</label>
          <input
            type="text"
            name="term"
            placeholder={this.state.term}
            onChange={this.changeHandler.bind(this, "term")}
          />
        </div>

        <button type="submit">Create Course</button>
      </form>
    );
  }
}

export default CreateCourse;
