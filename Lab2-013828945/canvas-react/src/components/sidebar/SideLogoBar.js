import React, { Component } from "react";
import SideHoverBar from "./../sidehover/SideHoverBar";
import "../../styles/SideLogoBar.css";
import sjsulogo from "../../images/Logo-sjsu.JPG";
import account from "../../images/Logo-account.jpg";
import courses from "../../images/Logo-courses.jpg";
import dashboard from "../../images/Logo-dashboard.jpg";
import studentLogo from "../../images/student-logo.svg";
import create from "../../images/create-course.png";
import inbox from "../../images/inbox.PNG";
import rooturl from "../config/urlConfig";

import {
  openAccountHover,
  closeAccountHover,
  openCourseHover,
  closeCourseHover
} from "./../../actions";
import axios from "axios";
import cookie from "react-cookies";
import { connect } from "react-redux";

class SideLogoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // accountSidebar: false,
      // courseSidebar: false,
      courses: [],
      account: []
    };
  }
  componentDidMount() {
    let usertype = localStorage.getItem("type");
    let userid = cookie.load("userid");
    console.log(userid);
    axios.defaults.withCredentials = true;
    axios
      .get("http://" + rooturl + ":4000/course/mycourses", {
        params: { userid: userid, type: usertype }
      })
      .then(response => {
        this.setState({
          courses: this.state.courses.concat(response.data)
        });
      });
    axios
      .get("http://" + rooturl + ":4000/account/profile", {
        params: { userid: userid }
      })
      .then(response => {
        this.setState({
          account: response.data
        });
      });
  }

  toggleCourseSidebar(name, e) {
    console.log(this.props.hoverBar);
    if (name === "accountSidebar") {
      !this.props.hoverBar.accountHover
        ? this.props.dispatch(openAccountHover())
        : this.props.dispatch(closeAccountHover());
    }
    if (name === "courseSidebar") {
      !this.props.hoverBar.courseHover
        ? this.props.dispatch(openCourseHover())
        : this.props.dispatch(closeCourseHover());
    }
  }

  render() {
    let populateFeed = this.props.setCanvasFeed;
    console.log(this.props.hoverBar);
    return (
      <div className="SideLogoBar">
        <div>
          <div>
            <img className="SideIcons" src={sjsulogo} alt="SJSULogo" />
          </div>
          <div>
            <img
              className="SideIcons"
              src={account}
              alt="Account"
              onClick={this.toggleCourseSidebar.bind(this, "accountSidebar")}
            />
            <SideHoverBar
              onClose={this.toggleCourseSidebar.bind(this, "accountSidebar")}
              populateFeed={populateFeed}
              open={this.props.hoverBar.accountHover}
              account={this.state.account}
            />
          </div>
          <div onClick={this.toggleCourseSidebar.bind(this, "courseSidebar")}>
            <img className="SideIcons" src={courses} alt="Courses" />

            <SideHoverBar
              onClose={this.toggleCourseSidebar.bind(this, "courseSidebar")}
              populateFeed={populateFeed}
              open={this.props.hoverBar.courseHover}
              courses={this.state.courses}
            />
          </div>
          <div>
            <img
              className="SideIcons"
              src={dashboard}
              alt="Dashboard"
              onClick={() => populateFeed("dashboard")}
            />
          </div>
          {localStorage.getItem("type") === "Student" ? (
            <div>
              <img
                className="SideIcons"
                src={studentLogo}
                style={{
                  height: "45px",
                  margin: "0 auto",
                  display: "block"
                }}
                alt="Enroll"
                onClick={() => populateFeed("enroll")}
              />
            </div>
          ) : (
            <div>
              <img
                className="SideIcons"
                src={create}
                alt="Create"
                onClick={() => populateFeed("create")}
              />
            </div>
          )}
          <div>
            <img
              className="SideIcons"
              src={inbox}
              alt="Inbox"
              onClick={() => populateFeed("inbox")}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    hoverBar: store.hoverbar,
    inbox: store.inbox
  };
};

// export default SideLogoBar;
export default connect(mapStateToProps)(SideLogoBar);
