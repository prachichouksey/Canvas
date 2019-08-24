import React, { Component } from "react";
import axios from "axios";

class QuizDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0
    };
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
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post("http://localhost:4000/quizzes/upload", data, {
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

  render() {
    if (!!this.props.detail) {
      return (
        <div className="col-3">
          <h4>Quiz {this.props.detail.quizid}</h4>
          <div style={{ textAlign: "right" }} onClick={this.props.onClose}>
            X
          </div>
          <input type="file" name="" id="" onChange={this.handleSelectedFile} />
          <button onClick={this.handleUpload}>Upload</button>
          <div> {Math.round(this.state.loaded, 2)} %</div>
        </div>
      );
    } else return null;
  }
}

export default QuizDetails;
