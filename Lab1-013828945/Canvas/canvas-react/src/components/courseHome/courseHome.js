import React, { Component } from "react";
import axios from "axios";
import "../../styles/courseMenu.css";
class CourseHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursedetails: []
    };
  }
  componentDidMount() {
    console.log(this.props.courseid);
    axios
      .get("http://localhost:4000/course/", {
        params: { courseid: this.props.courseid }
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data[0]);
          this.setState({
            coursedetails: response.data[0]
          });
        }
      });
  }
  render() {
    let courseHomeDetails = this.state.coursedetails;
    return (
      <div>
        <table className="home-table">
          <tbody>
            <tr>
              <td>CourseName</td>
              <td>{courseHomeDetails.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{courseHomeDetails.description}</td>
            </tr>
            <tr>
              <td>Department</td>
              <td>{courseHomeDetails.department}</td>
            </tr>
            <tr>
              <td>Term</td>
              <td>{courseHomeDetails.term}</td>
            </tr>
            <tr>
              <td>Room</td>
              <td>{courseHomeDetails.room}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CourseHome;
