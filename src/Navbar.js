import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
// https://material-ui.com/components/selects/
import MenuItem from "@material-ui/core/MenuItem";
// https://material-ui.com/components/menus/
import Snackbar from "@material-ui/core/Snackbar";
// https://v3.material-ui.com/demos/snackbars/#simple
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "rc-slider";
//github.com/react-component/slider
import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyles";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = { format: "hex", open: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(e) {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  }
  closeSnackbar() {
    this.setState({ open: false });
  }

  render() {
    const { level, changeLevel, showingAllColors, classes } = this.props;
    const { format } = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">reactcolorpicker</Link>
        </div>
        {showingAllColors && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level} // defines starting value for slider
                min={100} // defines min range
                max={900} // defines max range
                step={100} // defines increment
                onAfterChange={changeLevel} // onchange handler
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            {/* onChange calls changeColorFormat from palette.js */}
            <MenuItem value={"hex"}>HEX - #ffffff</MenuItem> />
            <MenuItem value={"rgb"}>RGB - rgb(255, 255, 255)</MenuItem> />
            <MenuItem value={"rgba"}>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
            />
          </Select>
        </div>
        <Snackbar
          // sets position
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          // handles open
          open={this.state.open}
          // delay
          autoHideDuration={3000}
          // sets element for message content
          message={
            <span id="message-id">
              Format Changed To: {format.toUpperCase()}
            </span>
          }
          // sets aria label for accessibility
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          // allows close by clicking outside of snackbar
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              // handles close when clicking snackbar close icon
              onClick={this.closeSnackbar}
              // inherits default element color
              color="inherit"
              // set's the aria label for the close icon
              key="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
