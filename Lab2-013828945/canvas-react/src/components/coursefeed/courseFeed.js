import React, { Component } from "react";
//import cookie, { select } from "react-cookies";
import { HashRouter, Switch } from "react-router-dom";
import CourseHome from "../courseHome/courseHome";
import Assignment from "../assignment/assignment";
import Announcements from "../announcement/announcement";
import Grades from "../grades/grades";
import People from "../people/people";
import Quiz from "../quizzes/quizzes";
import Files from "./../files/files";
import "../../styles/courseMenu.css";
class CourseFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CourseContent: <CourseHome courseid={this.props.id} />
    };
    this.setCourseFeed = this.setCourseFeed.bind(this);
  }

  setCourseFeed(selection) {
    switch (selection) {
      case "home":
        this.setState({
          CourseContent: <CourseHome courseid={this.props.id} />
        });
        break;
      case "assignment":
        this.setState({
          CourseContent: <Assignment courseid={this.props.id} />
        });
        break;

      case "announcement":
        this.setState({
          CourseContent: <Announcements courseid={this.props.id} />
        });
        break;
      case "grades":
        this.setState({ CourseContent: <Grades courseid={this.props.id} /> });
        break;
      case "people":
        this.setState({ CourseContent: <People courseid={this.props.id} /> });
        break;
      case "files":
        this.setState({
          CourseContent: <Files courseid={this.props.id} />
        });
        break;
      case "quiz":
        this.setState({ CourseContent: <Quiz courseid={this.props.id} /> });
        break;

      default:
        this.setState({
          CourseContent: <CourseHome courseid={this.props.id} />
        });
        break;
    }
  }
  render() {
    let courseid = this.props.id;

    return (
      <div>
        <h1>{courseid}</h1>
        <div className="row">
          <div className="col xs-5">
            <ul>
              <li
                className="course-menu"
                onClick={() => this.setCourseFeed("home")}
              >
                Home
              </li>
              <li
                className="course-menu"
                onClick={() => this.setCourseFeed("assignment")}
              >
                Assignment
              </li>
              <li
                className="course-menu"
                onClick={() => this.setCourseFeed("announcement")}
              >
                Announcements
              </li>
              <li
                className="course-menu"
                onClick={() => this.setCourseFeed("grades")}
              >
                Grades
              </li>
              <li
                className="course-menu"
                onClick={() => this.setCourseFeed("quiz")}
              >
                Quiz
              </li>
              <li
                className="course-menu"
                onClick={() => this.setCourseFeed("people")}
              >
                People
              </li>
              <li
                className="course-menu"
                onClick={() => this.setCourseFeed("files")}
              >
                Files
              </li>
            </ul>
          </div>

          <div className="col xs-9" style={{ padding: "20px" }}>
            <HashRouter>
              <Switch>{this.state.CourseContent}</Switch>
            </HashRouter>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseFeed;
