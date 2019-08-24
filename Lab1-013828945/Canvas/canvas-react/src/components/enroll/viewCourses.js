import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";

class ViewCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      filter: "courseid",
      filtervalue: ""
    };
    this.filterCourseHandler = this.filterCourseHandler.bind(this);
    this.valueChangeHandler = this.valueChangeHandler.bind(this);
    this.searchCourses = this.searchCourses.bind(this);
    this.enrollStudent = this.enrollStudent.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:4000/courses/allcourses").then(response => {
      if (response.status === 200) {
        console.log(response.data);
        this.setState({
          courses: response.data
        });
      }
    });
  }

  filterCourseHandler = e => {
    this.setState({
      filter: e.target.value
    });
  };
  valueChangeHandler = e => {
    this.setState({
      filtervalue: e.target.value
    });
  };
  searchCourses = e => {
    let data = {
      filter: this.state.filter,
      filtervalue: this.state.filtervalue,
      userid: cookie.load("userid")
    };
    axios
      .get("http://localhost:4000/course/allcourses", { params: data })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            courses: response.data
          });
        }
      });
  };

  enrollStudent(courseid) {
    let data = {
      courseid: courseid,
      userid: cookie.load("userid")
    };
    axios
      .post("http://localhost:4000/course/addcourse", { params: data })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            courses: response.data
          });
        }
      });
  }

  render() {
    let courses = this.state.courses;
    let allCourses = null;
    const type = localStorage.getItem("type");
    if (courses != null) {
      allCourses = courses.map(course => {
        return (
          <tr key={course.courseid}>
            <td>{course.courseid}</td>
            <td>{course.name}</td>
            <td>{course.department}</td>
            <td>{course.description}</td>
            <td>{course.term}</td>
            <td>
              {(course.status === "open" || course.status === "waitlist") &&
                type === "Student" && (
                  <button
                    onClick={this.enrollStudent.bind(this, course.courseid)}
                  >
                    Enroll
                  </button>
                )}
            </td>
          </tr>
        );
      });
    }
    return (
      <div>
        <div>
          <input
            onChange={this.valueChangeHandler}
            type="text"
            name="search"
            placeholder="Search value"
          />
          <select onChange={this.filterCourseHandler} name="filter">
            <option value="id">By id</option>
            <option value="term">By Term</option>
            <option value="name">By Name</option>
          </select>

          <button onClick={this.searchCourses}>Search</button>
        </div>
        {allCourses}
      </div>
    );
  }
}

export default ViewCourses;
