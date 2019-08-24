import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import rooturl from "../config/urlConfig";
import Modal from "./../../library/modal/modal";
/**
 * @return {null}
 */
class AuthAssignmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: 0,
      submissions: [],
      modalOpen: false,
      gradeStatus: false
    };
    this.handleGrading = this.handleGrading.bind(this);
    this.changeGrade = this.changeGrade.bind(this);
    this.openSubmission = this.openSubmission.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }
  componentDidMount() {
    axios
      .get("http://" + rooturl + ":4000/assignment/submission", {
        params: {
          courseid: this.props.courseid,
          assignid: this.props.assignment.assignid,
          type: localStorage.getItem("type")
        }
      })
      .then(response => {
        response.status === 200 &&
          this.setState({ submissions: response.data.users });
        console.log(response.data.users);
      });
  }
  openSubmission() {
    this.setState({
      modalOpen: true
    });
  }
  handleGrading(submission) {
    console.log(this.state.grades);

    axios
      .post("http://" + rooturl + ":4000/grades/set", {
        courseid: this.props.courseid,
        userid: submission.userid,
        grade: this.state.grades,
        assignid: this.props.assignment.assignid
      })
      .then(response => {
        response.status === 200 && this.setState({ gradeStatus: "Grade set" });
      });
  }

  changeGrade(e) {
    this.setState({ grades: +e.target.value });
  }
  render() {
    let submissionList = this.state.submissions;
    let assignmentSubmissions = null;
    if (submissionList != null) {
      assignmentSubmissions = submissionList.map(submission => {
        console.log(submission);
        return (
          <div key={submission.userid} onClick={this.showStateChangeHandler}>
            <div className="border assignment">
              <div>
                Student-{submission.userid}
                <button onClick={this.openSubmission}>Grade</button>
              </div>
            </div>
            <Modal
              onClose={this.handleToggle.bind(this)}
              open={this.state.modalOpen}
            >
              {this.state.gradeStatus ? (
                <div>this.state.gradeStatus</div>
              ) : (
                <div />
              )}
              <div className="row">
                <div className="col-xs-10">
                  <iframe
                    style={{ height: "500px", width: "100%" }}
                    title="grade"
                    src={
                      submission.submissions[submission.submissions.length - 1]
                        .value
                    }
                  />
                </div>
                <div className="col-xs-2">
                  <input
                    type="number"
                    value={this.state.grades}
                    onChange={this.changeGrade}
                  />
                  <button onClick={this.handleGrading.bind(this, submission)}>
                    Grade
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        );
      });
    }
    return <div>{assignmentSubmissions}</div>;
  }
}
export default AuthAssignmentDetails;
//   if (!!this.props.assignment)
//     return (
//       <div className="col-3 mt-3 mb-3">
//         <div style={{ textAlign: "right" }} onClick={this.props.onClose}>
//           X
//         </div>
//         <div className="border assignment">
//           <div>
//             <div>Assignment-{this.props.assignment.assignid}</div>
//             <div>
//               <b>{this.props.assignment.question}</b>
//             </div>
//             <div>Due by: {this.props.assignment.duedate}</div>
//             <div>Marks: {this.props.assignment.marks}</div>
//             <button onClick={this.handleToggle.bind(this)}>Grade</button>
//             <Modal
//               onClose={this.handleToggle.bind(this)}
//               open={this.state.modalOpen}
//             >
//               <div className="row">
//                 <div className="col-xs-10">
//                   <iframe
//                     style={{ height: "500px", width: "100%" }}
//                     title="grade"
//                     src={"http://"+rooturl+":4000/assingments/304550.pdf"}
//                   />
//                 </div>
//                 <div className="col-xs-2">
//                   <input
//                     type="number"
//                     value={this.state.grades}
//                     onChange={this.changeGrade}
//                   />
//                   <button onClick={this.handleGrading}>Grade</button>
//                 </div>
//               </div>
//             </Modal>
//           </div>
//         </div>
//       </div>
//     );
//   else return null;
// }
