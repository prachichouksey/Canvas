import React, { Component } from "react";

const style = {
  generalStyle: {
    minWidth: "300px"
  },
  open: {
    display: "block"
  },
  close: {
    display: "none"
  },
  floating: {
    float: "left"
  }
};

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.isOpen = this.isOpen.bind(this);
  }
  isOpen() {
    return this.props.open ? style.open : style.close;
  }
  isFloating() {
    return this.props.floating ? style.floating : {};
  }
  render() {
    return (
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        style={{
          ...style.generalStyle,
          ...this.isOpen(),
          ...this.isFloating(),
          ...(this.props.style || {})
        }}
        className="SideBar"
      >
        <div
          onClick={this.props.onClose}
          style={{
            width: "calc(100% - 20px)",
            textAlign: "right",
            margin: "10px"
          }}
        >
          X
        </div>
        {this.props.open ? <div>{this.props.children}</div> : null}
      </div>
    );
  }
}

export default SideBar;
