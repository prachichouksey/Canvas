import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import rooturl from "../config/urlConfig";
/**
 * @return {null}
 */
class CreateAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignid: "",
      assignment: "",
      duedate: "",
      marks: "",
      status: false
    };
    this.submitAssignment = this.submitAssignment.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
  }
  changeHandler = (name, e) => {
    this.setState({
      [name]: e.target.value
    });
  };
  handleDueDateChange(date) {
    this.setState({
      duedate: date
    });
  }
  submitAssignment(e) {
    e.preventDefault();
    axios
      .post("http://" + rooturl + ":4000/assignment/add", {
        courseid: this.props.courseid,
        assignid: this.state.assignid,
        assignment: this.state.assignment,
        marks: this.state.marks,
        duedate: this.state.duedate,
        userid: cookie.load("userid")
      })
      .then(response => {
        response.status === 200 && this.setState({ status: response.data });
      });
  }

  render() {
    return (
      <div className="col-3">
        <h4>Create Assignment</h4>
        <div style={{ textAlign: "right" }} onClick={this.props.onClose}>
          X
        </div>
        <form onSubmit={this.submitAssignment}>
          <div>
            <label>Assignment Id</label>
            <input
              type="text"
              name="assignid"
              onChange={this.changeHandler.bind(this, "assignid")}
            />
          </div>
          <div>
            <label>Assignment Question</label>
            <input
              type="text"
              name="assignment"
              onChange={this.changeHandler.bind(this, "assignment")}
            />
          </div>
          <div>
            <label>Marks</label>
            <input
              type="text"
              name="marks"
              onChange={this.changeHandler.bind(this, "marks")}
            />
          </div>
          <div>
            <label>Due Date</label>
            <DatePicker
              className="form-control form-control-lg"
              dateFormat="MM/DD/YY"
              name="duedate"
              selected={this.state.duedate}
              onChange={this.handleDueDateChange}
            />
          </div>
          <div>
            <button type="submit">Create Assignment</button>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateAssignment;
