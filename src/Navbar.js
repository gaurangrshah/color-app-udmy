import React, { Component } from "react";
import Slider from "rc-slider";
//github.com/react-component/slider
import Select from "@material-ui/core/Select";
// https://material-ui.com/components/selects/
import MenuItem from "@material-ui/core/MenuItem";
// https://material-ui.com/components/menus/
import "rc-slider/assets/index.css";
// keep import before Navbar so the slider can be customized
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = { format: "hex" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ format: e.target.value });
    this.props.handleChange(e.target.value);
  }
  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;
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
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
            {/* onChange calls changeColorFormat from palette.js */}
            <MenuItem value={"hex"}>HEX - #ffffff</MenuItem> />
            <MenuItem value={"rgb"}>RGB - rgb(255, 255, 255)</MenuItem> />
            <MenuItem value={"rgba"}>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
            />
          </Select>
        </div>
      </header>
    );
  }
}

export default Navbar;
