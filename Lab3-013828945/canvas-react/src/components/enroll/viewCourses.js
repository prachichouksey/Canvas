import React, { Component } from "react";
import cookie from "react-cookies";
import rooturl from "../config/urlConfig";
import swal from "sweetalert";
import { graphql, compose, withApollo } from "react-apollo";
import { allcourses, enrollCourseMutation } from "../../queries/queries";

class ViewCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      courseResult: [],
      startIndex: 0,
      currentPage: 1,
      recordsPerPage: 3,
      status: ""
    };
    this.enrollStudent = this.enrollStudent.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentDidMount() {
    this.props.client
      .query({
        query: allcourses
      })
      .then(response => {
        console.log("Response", response);
        this.setState({
          courses: response.data.allcourses.courseData
        });
      });
  }

  valueChangeHandler = e => {
    this.setState({
      filtervalue: e.target.value
    });
  };

  enrollStudent(courseid) {
    this.props
      .enrollCourseMutation({
        variables: {
          courseid: courseid,
          userid: cookie.load("userid")
        }
      })
      .then(response => {
        if (response.data.enrollCourse.success) {
          this.setState({
            status: response.data
          });
        } else {
          swal("Error in enrolling!");
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

export default compose(
  withApollo,
  graphql(enrollCourseMutation, { name: "signUpMutation" })
)(ViewCourses);
