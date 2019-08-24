import React, { Component } from "react";
import axios from "axios";
import AssignmentDetails from "./assignmentDetails";
import AuthAssignmentDetails from "./authAssignmentDetails";
import CreateAssignment from "./createAssignment";
import rooturl from "../config/urlConfig";
class Assignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignmentList: [],
      currentAssignment: null,
      showDetails: false,
      createAssignment: false
    };
    this.showDetailsHandler = this.showDetailsHandler.bind(this);
    this.hideDetailsHandler = this.hideDetailsHandler.bind(this);
    this.showCreateHandler = this.showCreateHandler.bind(this);
    this.hideCreateHandler = this.hideCreateHandler.bind(this);
  }
  showCreateHandler() {
    this.setState({
      createAssignment: true
    });
  }

  hideCreateHandler() {
    this.setState({ createAssignment: false });
  }

  showDetailsHandler(currentAssignment) {
    this.setState({
      showDetails: true,
      currentAssignment: currentAssignment
    });
  }

  hideDetailsHandler() {
    this.setState({ showDetails: false });
  }

  componentDidMount() {
    axios
      .get("http://" + rooturl + ":4000/assignment/all", {
        params: {
          courseid: this.props.courseid,
          type: localStorage.getItem("type")
        }
      })
      .then(response => {
        response.status === 200 &&
          this.setState({ assignmentList: response.data });
      });
  }

  render() {
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
            + Assignment
          </button>
        ) : (
          <div />
        )}
        {this.state.createAssignment ? (
          <CreateAssignment
            onClose={this.hideCreateHandler}
            courseid={this.props.courseid}
          />
        ) : !this.state.showDetails ? (
          this.state.assignmentList.map(assignment => {
            return (
              <div
                className="col-3 mt-3 mb-3"
                key={assignment.assignid}
                onClick={this.showDetailsHandler.bind(this, assignment)}
              >
                <div className="border assignment">
                  <div>Assignment-{assignment.assignid}</div>
                  <div>
                    <b>{assignment.assignment}</b>
                  </div>
                  <div>
                    Due by: {assignment.duedate}|Marks: {assignment.marks}
                  </div>
                </div>
              </div>
            );
          })
        ) : localStorage.getItem("type") === "Student" ? (
          <AssignmentDetails
            onClose={this.hideDetailsHandler}
            assignment={this.state.currentAssignment}
            courseid={this.props.courseid}
          />
        ) : (
          <AuthAssignmentDetails
            onClose={this.hideDetailsHandler}
            assignment={this.state.currentAssignment}
            courseid={this.props.courseid}
          />
        )}
      </div>
    );
  }
}

export default Assignment;
