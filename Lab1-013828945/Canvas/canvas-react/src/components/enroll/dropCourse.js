import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";

class DropCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
    this.dropStudent = this.dropStudent.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/course/dashboard", {
        params: {
          userid: cookie.load("userid"),
          type: localStorage.getItem("type")
        }
      })
      .then(response => {
        this.setState({
          courses: this.state.courses.concat(response.data)
        });
      });
  }

  dropStudent(courseid) {
    let data = {
      courseid: courseid,
      userid: cookie.load("userid")
    };
    axios.post("http://localhost:4000/course/dropcourse", data);
  }

  render() {
    let courses = this.state.courses;
    let myCourses = null;

    if (courses != null) {
      myCourses = courses.map(course => {
        return (
          <tr key={course.courseid}>
            <td>{course.courseid}</td>
            <td>{course.name}</td>
            <td>{course.department}</td>
            <td>{course.description}</td>
            <td>{course.term}</td>
            <td>
              <button onClick={this.dropStudent.bind(this, course.courseid)}>
                Drop
              </button>
            </td>
          </tr>
        );
      });
    }
    return <div>{myCourses}</div>;
  }
}

export default DropCourse;
