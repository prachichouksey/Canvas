import React, { Component } from "react";
import axios from "axios";
import rooturl from "../config/urlConfig";

class GenerateCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      courseid: ""
    };

    this.valueChangeHandler = this.valueChangeHandler.bind(this);
    this.getCourses = this.getCourses.bind(this);
    this.addCodeForStudent = this.addCodeForStudent.bind(this);
  }

  valueChangeHandler = e => {
    this.setState({
      courseid: e.target.value
    });
  };
  getStudents = e => {
    let data = {
      courseid: this.state.courseid
    };
    axios
      .get("http://" + rooturl + ":4000/course/allstudents", { params: data })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            students: response.data
          });
        }
      });
  };

  addCodeForStudent(studentid) {
    let data = {
      courseid: this.state.courseid,
      studentid: studentid
    };
    axios
      .post("http://" + rooturl + ":4000/course/addstudent", data)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
        }
      });
  }

  render() {
    let students = this.state.students;
    let allStudents = null;

    if (students != null) {
      allStudents = students.map(student => {
        return (
          <tr key={student.studentid}>
            <td>{student.studentid}</td>
            <td>{student.status}</td>
            {student.addcode != null && <td>{student.addcode}</td>}
            {student.addcode != null && <td>{student.codevalid}</td>}

            {student.status === "waitlist" && (
              <button
                onClick={this.addCodeForStudent.bind(this, student.studentid)}
              >
                Add Code
              </button>
            )}
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

          <button onClick={this.getStudents}>Search</button>
        </div>
        {allStudents}
      </div>
    );
  }
}

export default GenerateCode;
