import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import rooturl from "../config/urlConfig";

class ViewCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      courseResult: [],
      filter: "courseid",
      filtervalue: "",
      startIndex: 0,
      currentPage: 1,
      recordsPerPage: 3,
      status: ""
    };
    this.filterCourseHandler = this.filterCourseHandler.bind(this);
    this.valueChangeHandler = this.valueChangeHandler.bind(this);
    this.searchCourses = this.searchCourses.bind(this);
    this.enrollStudent = this.enrollStudent.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://" + rooturl + ":4000/course/allcourses")
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            courses: response.data
          });
          const courses = this.state.courses.slice();
          let courseResult = courses.filter(course => {
            let index = courses.indexOf(course);
            return index >= 0 && index <= 2;
          });

          this.setState({
            courseResult: courseResult
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
      .get("http://" + rooturl + ":4000/course/allcourses", { params: data })
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
      .post("http://" + rooturl + ":4000/course/addcourse", { params: data })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            status: response.data
          });
        }
      });
  }
  handlePagination(event) {
    var target = event.target;
    var id = target.id;
    var flag = true;
    let startIndex = 0;
    if (id === "prev") {
      console.log("SI", this.state.startIndex);
      if (this.state.startIndex > 0) {
        startIndex = this.state.startIndex - this.state.recordsPerPage;
        this.setState({
          currentPage: this.state.currentPage - 1
        });
      } else {
        flag = false;
      }
    } else {
      startIndex = this.state.startIndex + this.state.recordsPerPage;
      this.setState({
        currentPage: this.state.currentPage + 1
      });
      if (startIndex > this.state.courses.length) {
        flag = false;
      }
    }

    if (flag === true) {
      let endIndex = startIndex + this.state.recordsPerPage - 1;
      let courses = this.state.courses;
      let coursesResult = this.state.courses.filter(course => {
        let index = courses.indexOf(course);
        return index >= startIndex && index <= endIndex;
      });

      this.setState({
        courseResult: coursesResult,
        startIndex: startIndex
      });
    }
  }

  render() {
    let courses = this.state.courseResult;
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
    return this.state.status ? (
      <div>{this.state.status}</div>
    ) : (
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
        <div>
          <button
            style={{
              padding: " 10px",
              border: " 0",
              "border-radius": " 2px",
              "background-color": " rgb(0, 85, 162)",
              color: " white",
              "font-weight": " bolder",
              cursor: "pointer"
            }}
            id="prev"
            onClick={this.handlePagination}
          >
            Prev
          </button>
          <a href> Page: {this.state.currentPage}</a>
          <button
            style={{
              padding: " 10px",
              border: " 0",
              "border-radius": " 2px",
              "background-color": " rgb(0, 85, 162)",
              color: " white",
              "font-weight": " bolder",
              cursor: "pointer"
            }}
            id="next"
            onClick={this.handlePagination}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default ViewCourses;
