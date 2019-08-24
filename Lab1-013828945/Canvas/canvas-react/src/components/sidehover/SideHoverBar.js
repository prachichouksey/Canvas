import React, { Component } from "react";
import SideBar from "./../../library/sidebar";

class SideHoverBar extends Component {
  render() {
    let sidebarContent = this.props;
    return (
      <SideBar
        onClose={this.props.onClose}
        open={this.props.open}
        floating={true}
        style={{
          position: "absolute",
          left: "80px",
          top: 0,
          backgroundColor: "#fff",
          height: "calc(100vh - 30px)",
          border: ".5px solid #333",
          padding:"10px"
        }}
      >
        {this.props.courses ? (
          <Content
            courses={this.props.courses}
            callback={this.props.populateFeed}
          />
        ) : (
          <Profile
            account={this.props.account}
            callback={this.props.populateFeed}
          />
        )}
      </SideBar>
    );
  }
}

function Content(props) {
  let { courses, callback } = props;
  return (
    <div>
      {courses.map(({ courseid, coursename, description }) => (
        <div
        style={{
          "padding":" 5px",
    "border":" 0.5px solid #dedede",
    "border-radius":" 4px",
    "cursor":" pointer",
        }} 
        onClick={callback.bind(this, "courses", courseid)} key={courseid}>
          {coursename}:{description}
        </div>
      ))}
    </div>
  );
}

function Profile(props) {
  let { account, callback } = props;
  return (
    <div >
      <div onClick={callback.bind(this, "account", account)}>
        {
          account.profileimage ? (
          <img src={account.profileimage} style={{margin:" 0 auto", height: "150px", display:"block","border-radius":"50%" }} />
        ) : (
          <div>{JSON.stringify(account)}</div>
        )
      }
        <div style={{"text-align":"center"}}>
          <div>{account.name}</div>
          <button onSubmit="">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default SideHoverBar;
