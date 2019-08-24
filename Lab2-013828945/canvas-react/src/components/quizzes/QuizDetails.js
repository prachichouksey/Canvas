import React, { Component } from "react";

class QuizDetails extends Component {
  render() {
    if (!!this.props.detail) {
      return (
        <div className="col-3">
          <h4>Quiz {this.props.detail.quizid}</h4>
          {this.props.questions.map((item, i) => (
            <div>
              <div>Question: {item.questionval}</div>
              <div>
                <input type="radio" />
                {item.option1}
                <input type="radio" />
                {item.option2}
                <input type="radio" />
                {item.option3}
                <input type="radio" />
                {item.option4}
              </div>
            </div>
          ))}
          <button
            style={{
              padding: " 10px",
              border: " 0",
              "border-radius": " 2px",
              "background-color": " rgb(0, 85, 162)",
              color: " white",
              "font-weight": " bolder",
              cursor: "pointer"
            }}
          >
            Submit Quiz
          </button>
        </div>
      );
    } else return null;
  }
}

export default QuizDetails;
