import React, { Component } from "react";
import CourseFeed from "../coursefeed/courseFeed";
//import CanvasHover from "../canvashover/canvasHover";

class Courses extends Component {
  render() {
    return (
      <div>
        {
          //JSON.stringify(this.props)
        }
        <div className="row">
          {
            //<div className="col-xs-2" />
          }

          <div className="col-xs-10">
            <CourseFeed id={this.props.id} name={this.props.name} />
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
