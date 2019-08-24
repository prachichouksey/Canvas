import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import rooturl from "../config/urlConfig";
/**
 * @return {null}
 */
class ComposeMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      body: "",
      to: "",
      status: false
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler = (name, e) => {
    this.setState({
      [name]: e.target.value
    });
  };
  sendMessage(e) {
    e.preventDefault();
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    axios
      .post("http://" + rooturl + ":4000/inbox/send", {
        from: cookie.load("userid"),
        to: this.state.to,
        subject: this.state.subject,
        body: this.state.body,
        dateSent: date
      })
      .then(response => {
        if (response.status === 200)
          this.setState({
            status: "Message sent successfully",
            subject: "",
            body: "",
            to: ""
          });
        else this.setState({ status: "Error in sending message" });
      });
  }

  render() {
    return (
      <div
        className="col-3"
        style={{
          border: " 1px solid grey",
          "border-radius": " 2px",
          margin: "0px 12px",
          "background-color": " white",
          color: "#2D3B45",
          font: "16px LatoWeb",
          width: 700
        }}
      >
        <h4>Compose Message</h4>
        <div style={{ textAlign: "right" }} onClick={this.props.onClose}>
          X
        </div>
        {this.state.status ? <div> {this.state.status}</div> : <div />}
        <form onSubmit={this.sendMessage} style={{ textAlign: "center" }}>
          <div>
            <label>To</label>
            <input
              type="email"
              name="to"
              required
              onChange={this.changeHandler.bind(this, "to")}
            />
          </div>
          <div>
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              onChange={this.changeHandler.bind(this, "subject")}
            />
          </div>
          <div>
            <label>Body</label>
            <textarea
              name="body"
              onChange={this.changeHandler.bind(this, "body")}
            />
          </div>
          <div>
            <button
              type="submit"
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
              Send Message
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default ComposeMessage;
