import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import InputBox from "./components/InputBox";
import OpButton from "./components/Operation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue1: "",
      inputValue2: "",
      result: "",
      operation: "+"
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectOperation = this.selectOperation.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
  }

  handleChange(name, e) {
    this.setState({ [name]: e.target.value });
  }

  selectOperation(op) {
    this.setState({ operation: op });
  }

  calculateResult() {
    let data = ({
      inputValue1: this.state.inputValue1,
      inputValue2: this.state.inputValue2,
      operation: this.state.operation
    } = this.state);
    axios.post("http://localhost:4000/calculate", data).then(response => {
      if (response.status === 200) {
        console.log(response.data);
        this.setState({
          result: response.data
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Calculator</h1>
        <InputBox
          display={"Number 1"}
          value={this.state.inputValue1}
          onChange={this.handleChange}
          name={"inputValue1"}
        />
        <OpButton display={"+"} onClick={this.selectOperation} name={"+"} />
        <OpButton display={"-"} onClick={this.selectOperation} name={"-"} />
        <OpButton display={"*"} onClick={this.selectOperation} name={"*"} />
        <OpButton display={"/"} onClick={this.selectOperation} name={"/"} />
        <InputBox
          display={"Number 2"}
          value={this.state.inputValue2}
          onChange={this.handleChange}
          name={"inputValue2"}
        />
        <OpButton display={"="} onClick={this.calculateResult} name={"="} />
        <InputBox
          display={"Result"}
          value={this.state.result}
          onChange={() => {}}
        />
      </div>
    );
  }
}

export default App;
