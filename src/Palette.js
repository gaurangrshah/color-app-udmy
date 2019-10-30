import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeColorFormat = this.changeColorFormat.bind(this);
  }

  changeLevel(level) {
    console.log(level);
    this.setState({ level });
  }

  changeColorFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { colors } = this.props.palette;
    const { level, format } = this.state;
    // console.log(generatePalette(seedColors[4]));
    // console.log(colors);
    const colorboxes = colors[level].map(color => (
      <ColorBox background={color[format]} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeColorFormat}
        />
        {/* Navbar will go here */}
        <div className="Palette-colors">{colorboxes}</div>
        {/* footer will go here */}
      </div>
    );
  }
}

export default Palette;
