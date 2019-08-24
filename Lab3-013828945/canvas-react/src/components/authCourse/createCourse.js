import React, { Component } from "react";
import cookie from "react-cookies";
import { graphql } from "react-apollo";
import { createCourseMutation } from "../../queries/queries";
import swal from "sweetalert";

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

    let userid = cookie.load("userid");

    this.props
      .createCourseMutation({
        variables: {
          courseid: this.state.courseid,
          name: this.state.name,
          department: this.state.department,
          description: this.state.description,
          room: this.state.room,
          capacity: this.state.capacity,
          waitlist: this.state.waitlist,
          term: this.state.term,
          userid: userid
        }
      })
      .then(response => {
        if (response.data.CreateCourse.success) {
          this.setState({
            status: "Success"
          });
        } else {
          swal("Course already exists");
          this.setState({
            courseid: "",
            name: "",
            department: "",
            description: "",
            room: "",
            capacity: "",
            waitlist: "",
            term: "",
            userid: "",
            status: "Error in creating course"
          });
        }
      })
      .catch(err => {
        swal("Course already exists");
        this.setState({
          courseid: "",
          name: "",
          department: "",
          description: "",
          room: "",
          capacity: "",
          waitlist: "",
          term: "",
          userid: "",
          status: "Error in creating course"
        });
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
            required
          />
        </div>
        <div>
          <label>Course Name</label>
          <input
            type="text"
            name="name"
            placeholder={this.state.name}
            onChange={this.changeHandler.bind(this, "name")}
            required
          />
        </div>
        <div>
          <label>Department</label>
          <input
            type="text"
            name="department"
            placeholder={this.state.department}
            onChange={this.changeHandler.bind(this, "department")}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder={this.state.description}
            onChange={this.changeHandler.bind(this, "description")}
            required
          />
        </div>
        <div>
          <label>Room</label>
          <input
            type="text"
            name="room"
            placeholder={this.state.room}
            onChange={this.changeHandler.bind(this, "room")}
            required
          />
        </div>
        <div>
          <label>Capacity</label>
          <input
            type="text"
            name="capacity"
            placeholder={this.state.capacity}
            onChange={this.changeHandler.bind(this, "capacity")}
            required
          />
        </div>
        <div>
          <label>Waitlist</label>
          <input
            type="text"
            name="waitlist"
            placeholder={this.state.waitlist}
            onChange={this.changeHandler.bind(this, "waitlist")}
            required
          />
        </div>
        <div>
          <label>Term</label>
          <input
            type="text"
            name="term"
            placeholder={this.state.term}
            onChange={this.changeHandler.bind(this, "term")}
            required
          />
        </div>

        <button type="submit">Create Course</button>
      </form>
    );
  }
}

export default graphql(createCourseMutation, { name: "createCourseMutation" })(
  CreateCourse
);
