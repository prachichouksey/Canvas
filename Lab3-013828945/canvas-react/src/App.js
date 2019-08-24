import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import cookie from "react-cookies";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Main />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
