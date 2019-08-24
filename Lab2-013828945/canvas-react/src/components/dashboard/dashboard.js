import React, { Component } from "react";
import "../../styles/dashboard.css";
import axios from "axios";
import cookie from "react-cookies";
import Draggable from "react-draggable";
import rooturl from "../config/urlConfig";

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
    // let data = {
    //   userid: 12363,
    //   type: usertype
    // };
    //console.log(data);
    axios.defaults.withCredentials = true;
    axios
      .get("http://" + rooturl + ":4000/course/dashboard", {
        params: { userid: userid, type: usertype }
      })
      .then(response => {
        this.setState({
          courses: this.state.courses.concat(response.data)
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
              <div className="coursename-tile">
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
export default Dashboard;
