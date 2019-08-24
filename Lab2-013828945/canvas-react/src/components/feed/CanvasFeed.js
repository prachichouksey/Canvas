import React, { Component } from "react";
import { HashRouter, Switch } from "react-router-dom";
import Courses from "../course/courses";
import Dashboard from "../dashboard/dashboard";
import SideLogoBar from "../sidebar/SideLogoBar";
import Enroll from "../enroll/enroll";
import Account from "../account/account.js";
import AuthCourse from "../authCourse/authCourse";
import Inbox from "../inbox/inbox";
class CanvasFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasContent: <Dashboard />
    };
    this.setCanvasFeed = this.setCanvasFeed.bind(this);
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
        canvasContent: <Dashboard />
      });
    }
    if (icon === "enroll") {
      this.setState({
        canvasContent: <Enroll id={id} />
      });
    }
    if (icon === "create") {
      this.setState({
        canvasContent: <AuthCourse />
      });
    }
    if (icon === "inbox") {
      this.setState({
        canvasContent: <Inbox />
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
