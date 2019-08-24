import React, { Component } from "react";
import axios from "axios";
import AssignmentDetails from "./assignmentDetails";

class Assignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignmentList: [],
      currentAssignment: null,
      showDetails: false
    };
    this.showDetailsHandler = this.showDetailsHandler.bind(this);
    this.hideDetailsHandler = this.hideDetailsHandler.bind(this);
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
      .get("http://localhost:4000/assignment/all", {
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
    let userType = localStorage.getItem("userid");
    return (
      <div >
        {
           userType === "Faculty" ? (
          <button style={{
    "padding":" 10px",
    "border":" 0",
    "border-radius":" 2px",
    "background-color":" rgb(0, 85, 162)",
    "color":" white",
    "font-weight":" bolder",
    "cursor":"pointer"
}} >Create Assignment</button>
        ) : (
          <div />
        )
      }
        {!this.state.showDetails ? (
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
                    <b>{assignment.question}</b>
                  </div>
                  <div>
                    Due by: {assignment.duedate}|Marks: {assignment.marks}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <AssignmentDetails
            onClose={this.hideDetailsHandler}
            assignment={this.state.currentAssignment}
          />
        )}
      </div>
    );
  }
}

export default Assignment;
