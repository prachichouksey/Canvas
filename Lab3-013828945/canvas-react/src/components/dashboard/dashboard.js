import React, { Component } from "react";
import "../../styles/dashboard.css";
import cookie from "react-cookies";
import Draggable from "react-draggable";
import { withApollo } from "react-apollo";
import { mycourses } from "../../queries/queries";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      courses: []
    };
  }
  componentDidMount() {
    let usertype = localStorage.getItem("type");
    let userid = cookie.load("userid");
    console.log(userid);
    this.props.client
      .query({
        query: mycourses,
        variables: {
          userid: userid,
          type: usertype
        }
      })
      .then(response => {
        console.log("Response", response);
        this.setState({
          account: response.data.profile.userData
        });
      });
  }
  render() {
    let allCourses = this.state.courses;
    let DashboardCourses = null;
    if (allCourses != null) {
      DashboardCourses = allCourses.map(course => {
        return (
          <Draggable>
            <div
              draggable="true"
              className="course-tiles"
              style={{ display: "inline-block" }}
            >
              <div className="color-box" />
              <div
                className="coursename-tile"
                onClick={() =>
                  this.props.setCanvasFeed("courses", course.courseid)
                }
              >
                <p>
                  {course.coursename}:{course.description}
                </p>
              </div>
            </div>
          </Draggable>
        );
      });
    }

    return (
      <div className="Dashboard-container">
        <h1>Dashboard</h1>
        <div>{DashboardCourses}</div>
      </div>
    );
  }
}
export default withApollo(Dashboard);
