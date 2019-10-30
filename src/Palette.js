import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    console.log(this.props);
    const colorboxes = this.props.colors.map(color => (
      <ColorBox background={color.color} name={color.name} />
    ));
    console.log(this.props);
    return (
      <div className="Palette">
        {/* Navbar will go here */}
        <div className="Palette-colors">{colorboxes}</div>
        {/* footer will go here */}
      </div>
    );
  }
}

export default Palette;
