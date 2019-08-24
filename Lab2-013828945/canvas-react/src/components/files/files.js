import React, { Component } from "react";
import axios from "axios";
import rooturl from "../config/urlConfig";

class Files extends Component {
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
      .post("http://" + rooturl + ":4000/quizzes/upload", data, {
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
    return (
      <div>
        <iframe
          title="lab-notes"
          style={{ height: "300px", width: "400px" }}
          src="http://localhost:8080"
        />
        <input type="file" name="" id="" onChange={this.handleSelectedFile} />
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded, 2)} %</div>
      </div>
    );
  }
}

export default Files;
