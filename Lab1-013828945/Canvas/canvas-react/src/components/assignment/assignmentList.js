import React, { Component } from "react";
import axios from "axios";
import AssignmentDetails from "./assignmentDetails";
class AssignmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment: [],
      showDetails: false
    };
    this.showStateChangeHandler = this.showStateChangeHandler.bind(this);
  }
  showStateChangeHandler = e => {
    e.preventDefault();
    this.setState({
      showDetails: !this.showDetails
    });
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/assignment/all", {
        params: {
          courseid: this.props.courseid,
          type: localStorage.getItem("type")
        }
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            assignment: response.data
          });
        }
      });
  }
  render() {
    let assignmentlist = this.state.assignment;
    let assignments = null;
    if (assignmentlist != null) {
      assignments = assignmentlist.map(assignment => {
        return (
          <div
            className="col-3 mt-3 mb-3"
            key={assignment.assignid}
            onClick={this.showStateChangeHandler}
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
      });
    }
    return (
      <div>
        {!this.state.showDetails && <div> {assignments}</div>}
        {this.state.showDetails && <AssignmentDetails />}
      </div>
    );
  }
}

export default AssignmentList;
