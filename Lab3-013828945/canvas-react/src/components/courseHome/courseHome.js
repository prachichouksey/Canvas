import React, { Component } from "react";

import "../../styles/courseMenu.css";
import rooturl from "../config/urlConfig";
import { withApollo } from "react-apollo";
import { course } from "../../queries/queries";

class CourseHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursedetails: []
    };
  }
  componentDidMount() {
    console.log(this.props.courseid);
    this.props.client
      .query({
        query: course,
        variables: {
          courseid: this.props.courseid
        }
      })
      .then(response => {
        console.log("Response", response);
        this.setState({
          coursedetails: response.data.course.courseData
        });
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
              <td>{courseHomeDetails.coursename}</td>
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

export default withApollo(CourseHome);
