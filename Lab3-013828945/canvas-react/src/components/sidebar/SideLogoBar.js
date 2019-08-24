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
//import rooturl from "../config/urlConfig";
import { withApollo } from "react-apollo";
import { profile, mycourses } from "../../queries/queries";

import cookie from "react-cookies";

class SideLogoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountSidebar: false,
      courseSidebar: false,
      courses: [],
      account: []
    };
  }
  toggleCourseSidebar(name, e) {
    // e.preventDefault();
    this.setState({ [name]: !this.state[name] });
  }
  componentDidMount() {
    let usertype = localStorage.getItem("type");
    let userid = cookie.load("userid");
    console.log(userid);

    this.props.client
      .query({
        query: profile,
        variables: {
          userid: userid
        }
      })
      .then(response => {
        console.log("Response", response);
        this.setState({
          account: response.data.profile.userData
        });
      });

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
              open={this.state.accountSidebar}
              account={this.state.account}
            />
          </div>
          <div onClick={this.toggleCourseSidebar.bind(this, "courseSidebar")}>
            <img className="SideIcons" src={courses} alt="Courses" />

            <SideHoverBar
              onClose={this.toggleCourseSidebar.bind(this, "courseSidebar")}
              populateFeed={populateFeed}
              open={this.state.courseSidebar}
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

// const mapStateToProps = store => {
//   return {
//     hoverBar: store.hoverbar,
//     inbox: store.inbox
//   };
// };

// export default SideLogoBar;
//export default connect(mapStateToProps)(SideLogoBar);

export default withApollo(SideLogoBar);
