import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import rooturl from "../config/urlConfig";

class Grades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
  }
  componentDidMount() {
    let userid = cookie.load("userid");
    console.log(userid);
    axios
      .get("http://" + rooturl + ":4000/grades/all", {
        params: { userid: userid, courseid: this.props.courseid }
      })
      .then(response => {
        console.log(response);
        this.setState({
          grades: response.data
        });
      });
  }
  render() {
    let allGrades = this.state.grades;
    let grades = null;
    if (allGrades != null) {
      grades = allGrades.map(grade => {
        return (
          <tr className="col-3 mt-3 mb-3" key={grade.gradeid}>
            <td>{grade.question}</td>
            <td>{grade.grade}</td>
            <td>{grade.marks}</td>
          </tr>
        );
      });
    }
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Assignment</th>
              <th>Grade</th>
              <th>Out Of</th>
            </tr>
            {grades}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Grades;
