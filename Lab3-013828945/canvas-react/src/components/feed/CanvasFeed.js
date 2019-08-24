import React, { Component } from "react";
import { HashRouter, Switch } from "react-router-dom";
import Courses from "../course/courses";
import Dashboard from "../dashboard/dashboard";
import SideLogoBar from "../sidebar/SideLogoBar";
import Account from "../account/account.js";
import AuthCourse from "../authCourse/authCourse";

class CanvasFeed extends Component {
  constructor(props) {
    super(props);
    this.setCanvasFeed = this.setCanvasFeed.bind(this);
    this.state = {
      canvasContent: <Dashboard setCanvasFeed={this.setCanvasFeed} />
    };
  }
  setCanvasFeed(icon, id) {
    if (icon === "account") {
      this.setState({
        canvasContent: <Account />
      });
    }
    if (icon === "courses") {
      this.setState({
        canvasContent: <Courses id={id} />
      });
    }
    if (icon === "dashboard") {
      this.setState({
        canvasContent: <Dashboard setCanvasFeed={this.setCanvasFeed} />
      });
    }

    if (icon === "create") {
      this.setState({
        canvasContent: <AuthCourse />
      });
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-1">
            <SideLogoBar setCanvasFeed={this.setCanvasFeed} />
          </div>

          <div className="col-xs-11">
            {
              //<HashRouter>
              //<Switch>
              // <Route path="/courses" component={Courses} />
              //<Route path="/dashboard" component={Dashboard} />
              // </Switch>
              //</HashRouter>
            }
            <HashRouter>
              <Switch>{this.state.canvasContent}</Switch>
            </HashRouter>
          </div>
        </div>
      </div>
    );
  }
}

export default CanvasFeed;
