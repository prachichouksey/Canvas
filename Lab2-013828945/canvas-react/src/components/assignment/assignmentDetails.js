import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import rooturl from "../config/urlConfig";
/**
 * @return {null}
 */
class AssignmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      currentAssignment: null,
      grades: 0,
      selectedFile: null,
      loaded: 0
    };
    // this.handleGrading = this.handleGrading.bind(this);
    // this.changeGrade = this.changeGrade.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleSelectedFile(event) {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  }

  handleUpload() {
    const data = new FormData();
    let path = "http://" + rooturl + ":4000/";
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);
    data.append("userid", cookie.load("userid"));
    data.append("courseid", this.props.courseid);
    data.append("assignid", this.props.assignment.assignid);
    data.append("path", path);
    axios
      .post("http://" + rooturl + ":4000/assignment/upload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        console.log(res.statusText);
      });
  }

  handleToggle() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  // handleGrading() {
  //   console.log(this.state.grades);
  //   axios
  //     .post("http://" + rooturl + ":4000/grade/set", {
  //       courseid: "202",
  //       userid: cookie.load("userid"),
  //       grade: this.state.grades,
  //       assignid: this.props.assignment.assignid
  //     })
  //     .then(response => {
  //       response.status === 200 &&
  //         this.setState({ assignmentList: response.data });
  //     });
  // }

  // changeGrade(e) {
  //   this.setState({ grades: +e.target.value });
  // }

  render() {
    let assignment = this.props.assignment;
    return (
      <div className="col-3">
        <h4>Assignment Submission</h4>
        <div style={{ textAlign: "right" }} onClick={this.props.onClose}>
          X
        </div>
        <div>Assignment-{assignment.assignid}</div>
        <div>
          <b>{assignment.assignment}</b>
        </div>
        <div>
          Due by: {assignment.duedate}|Marks: {assignment.marks}
        </div>
        Upload your assignment solution:
        <br />
        <input type="file" name="" id="" onChange={this.handleSelectedFile} />
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded, 2)} %</div>
      </div>
    );

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
  }
}
export default AssignmentDetails;
