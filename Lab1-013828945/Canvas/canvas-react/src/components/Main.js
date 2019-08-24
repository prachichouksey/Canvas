import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./signup/SignUp";
import LoginUser from "./login/LoginUser";
import cookie from "react-cookies";

import "flexboxgrid/dist/flexboxgrid.min.css";

import CanvasFeed from "./feed/CanvasFeed";

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginUser} />
          <Route path="/login" component={LoginUser} />
          <Route path="/signup" component={SignUp} />
          {cookie.load("userid") ? (
            <Route
              path="/canvas"
              children={props => (
                <div>
                  <CanvasFeed />
                </div>
              )}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;
