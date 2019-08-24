import React, { Component } from "react";
import axios from "axios";
import ComposeMessage from "./composeMessage";
import rooturl from "../config/urlConfig";
import cookie from "react-cookies";
class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      currentMessage: null,
      showDetails: false,
      composeMessage: false,
      replyStatus: false,
      replyBody: null,
      replyMessage: false
    };
    this.showDetailsHandler = this.showDetailsHandler.bind(this);
    this.hideDetailsHandler = this.hideDetailsHandler.bind(this);
    this.showCreateHandler = this.showCreateHandler.bind(this);
    this.hideCreateHandler = this.hideCreateHandler.bind(this);
    this.replyHandler = this.replyHandler.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler = (name, e) => {
    this.setState({
      [name]: e.target.value
    });
  };
  showCreateHandler() {
    this.setState({
      composeMessage: true
    });
  }

  hideCreateHandler() {
    this.setState({ composeMessage: false });
  }

  showDetailsHandler(currentMessage) {
    this.setState({
      showDetails: true,
      currentMessage: currentMessage
    });
  }

  hideDetailsHandler() {
    this.setState({ showDetails: false });
  }
  replyHandler() {
    this.setState({
      replyMessage: true
    });
  }
  componentDidMount() {
    axios
      .get("http://" + rooturl + ":4000/inbox/all", {
        params: {
          userid: cookie.load("userid")
        }
      })
      .then(response => {
        response.status === 200 &&
          this.setState({ messageList: response.data });
      });
  }
  sendMessage(e) {
    e.preventDefault();
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let replySubject = "Re:" + this.state.currentMessage.subject;
    axios
      .post("http://" + rooturl + ":4000/inbox/send", {
        from: cookie.load("userid"),
        to: this.state.currentMessage.from,
        subject: replySubject,
        body: this.state.replyBody,
        dateSent: date
      })
      .then(response => {
        if (response.status === 200)
          this.setState({
            replyStatus: "Message sent successfully",
            replyMessage: false
          });
        else
          this.setState({
            replyStatus: "Error in sending message"
          });
      });
  }

  render() {
    return (
      <div>
        <button
          onClick={this.showCreateHandler}
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
          + Compose
        </button>

        {this.state.composeMessage ? (
          <ComposeMessage onClose={this.hideCreateHandler} />
        ) : (
          this.state.messageList.map(message => {
            return (
              <div className="row">
                <div
                  className="col-10 mt-3 mb-3"
                  style={{
                    padding: "20px 10px",
                    border: " 1px solid grey",
                    "border-radius": " 2px",
                    margin: "0px 12px",
                    "background-color": " white",
                    color: "#2D3B45",
                    font: "16px LatoWeb",
                    cursor: "pointer",
                    width: 300,
                    height: 75
                  }}
                  key={message.subject}
                  onClick={this.showDetailsHandler.bind(this, message)}
                >
                  <div className="border assignment">
                    <div>Subject:{message.subject}</div>
                    <div>
                      <b>From:{message.from}</b>
                    </div>
                    <div>Date: {message.dateSent}</div>
                  </div>
                </div>
                <div
                  className="col-10 mt-3 mb-3"
                  style={{
                    padding: "20px 10px",
                    border: " 1px solid grey",
                    "border-radius": " 2px",
                    height: 1200,
                    "background-color": " white",
                    color: "#2D3B45",
                    font: "16px LatoWeb",
                    cursor: "pointer",
                    width: 500
                  }}
                >
                  {this.state.currentMessage ? (
                    <div
                      style={{
                        padding: "0px 10px",
                        "background-color": " white",
                        color: "#2D3B45",
                        font: " 18px LatoWeb"
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "2",
                          font: "30px LatoWeb"
                        }}
                      >
                        Subject
                        <br />
                        {this.state.currentMessage.subject}
                      </div>
                      <div>From:{this.state.currentMessage.from}</div>
                      <div>Content:{this.state.currentMessage.body}</div>
                      <div>Date Sent:{this.state.currentMessage.dateSent}</div>
                      <button
                        style={{
                          padding: " 10px",
                          border: "0",
                          "border-radius": " 2px",
                          "background-color": " rgb(0, 85, 162)",
                          color: " white",
                          "font-weight": " bolder",
                          cursor: "pointer"
                        }}
                        onClick={this.replyHandler}
                      >
                        Reply
                      </button>
                      {this.state.replyStatus ? (
                        <div>{this.state.replyStatus}</div>
                      ) : (
                        <div />
                      )}
                      {this.state.replyMessage ? (
                        <div>
                          <textArea
                            value="replyBody"
                            onChange={this.changeHandler.bind(
                              this,
                              "replyBody"
                            )}
                          />
                          <button
                            style={{
                              padding: " 10px",
                              border: "0",
                              "border-radius": " 2px",
                              "background-color": " rgb(0, 85, 162)",
                              color: " white",
                              "font-weight": " bolder",
                              cursor: "pointer"
                            }}
                            onClick={this.sendMessage}
                          >
                            Send Reply
                          </button>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default Inbox;
