import React, { Component } from "react";
import axios from "axios";
import CreateAnnouncement from "./createAnnouncement";
import cookie from "react-cookies";
import rooturl from "../config/urlConfig";

class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcement: [],
      createAnnouncement: false
    };
    this.showCreateHandler = this.showCreateHandler.bind(this);
    this.hideCreateHandler = this.hideCreateHandler.bind(this);
  }
  showCreateHandler() {
    this.setState({
      createAnnouncement: true
    });
  }

  hideCreateHandler() {
    this.setState({ createAnnouncement: false });
  }

  componentDidMount() {
    axios
      .get("http://" + rooturl + ":4000/announcement/all", {
        params: {
          courseid: this.props.courseid,
          userid: cookie.load("userid")
        }
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            announcement: response.data
          });
        }
      })
      .catch(console.log("Unable to get announcements"));
  }

  render() {
    let announcementlist = this.state.announcement;
    let announcements = null;
    if (announcementlist != null) {
      announcements = announcementlist.map(announcement => {
        return (
          <div className="col-3 mt-3 mb-3" key={announcement.heading}>
            <div className="border announcements">
              <div>
                <b>{announcement.heading}</b>
              </div>
              <div>{announcement.details}</div>
              <div>Posted On:{announcement.dateCreated}</div>
            </div>
          </div>
        );
      });
    }
    let userType = localStorage.getItem("type");
    return (
      <div>
        {userType === "Faculty" ? (
          <button
            onClick={this.showCreateHandler}
            style={{
              padding: " 10px",
              border: " 0",
              "border-radius": " 2px",
              "background-color": " rgb(0, 85, 162)",
              color: " white",
              "font-weight": " bolder",
              cursor: "pointer"
            }}
          >
            + Announcement
          </button>
        ) : (
          <div />
        )}
        {!this.state.createAnnouncement ? (
          <div>{announcements}</div>
        ) : (
          <CreateAnnouncement
            onClose={this.hideCreateHandler}
            courseid={this.props.courseid}
          />
        )}
      </div>
    );
  }
}

export default Announcement;
