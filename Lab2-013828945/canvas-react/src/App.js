import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser } from "./actions";
import cookie from "react-cookies";

if (cookie.load("userid")) {
  store.dispatch(setCurrentUser(cookie.load("userid")));
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
