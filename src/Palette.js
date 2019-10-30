import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Slider from "rc-slider";
//github.com/react-component/slider
import "./Palette.css";
import "rc-slider/assets/index.css";

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(level) {
    console.log(level);
    this.setState({ level });
  }
  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    // console.log(generatePalette(seedColors[4]));
    // console.log(colors);
    const colorboxes = colors[level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Slider
          defaultValue={level} // defines starting value for slider
          min={100} // defines min range
          max={900} // defines max range
          step={100} // defines increment
          onAfterChange={this.changeLevel} // onchange handler
        />
        {/* Navbar will go here */}
        <div className="Palette-colors">{colorboxes}</div>
        {/* footer will go here */}
      </div>
    );
  }
}

export default Palette;
