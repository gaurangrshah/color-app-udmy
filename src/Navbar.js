import React, { Component } from "react";
import Slider from "rc-slider";
//github.com/react-component/slider
import "rc-slider/assets/index.css";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { level, changeLevel } = this.props;
    return (
      <header className="Navbar">
        <div className="logo">
          <a href="#">reactcolorpicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level} // defines starting value for slider
              min={100} // defines min range
              max={900} // defines max range
              step={100} // defines increment
              onAfterChange={changeLevel} // onchange handler
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Navbar;
