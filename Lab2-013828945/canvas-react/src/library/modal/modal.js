import React from "react";

export default props => (
  <div
    style={{
      background: "white",
      height: "100vh",
      width: "100vw",
      top: "0",
      left: "0",
      position: "absolute",
      display: props.open ? "block" : "none"
    }}
  >
    <div onClick={props.onClose}>close</div>
    <div>{props.children}</div>
  </div>
);
