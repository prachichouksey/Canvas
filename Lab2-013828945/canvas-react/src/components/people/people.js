import React, { Component } from "react";
import axios from "axios";
import rooturl from "../config/urlConfig";

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: []
    };
  }
  componentDidMount() {
    axios
      .get("http://" + rooturl + ":4000/people/all", {
        params: { courseid: this.props.courseid }
      })
      .then(response => {
        console.log(response);
        this.setState({
          people: response.data
        });
      });
  }
  render() {
    let allPeople = this.state.people;
    let students = null;
    if (allPeople != null) {
      students = allPeople.map(people => {
        return (
          <tr className="col-3 mt-3 mb-3" key={people.userid}>
            <td>{people.userId}</td>
            <td>{people.name}</td>
            <td>{people.type}</td>
          </tr>
        );
      });
    }
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>StudentId</th>
              <th>Name</th>
              <th>Type</th>
            </tr>
            {students}
          </tbody>
        </table>
      </div>
    );
  }
}

export default People;
