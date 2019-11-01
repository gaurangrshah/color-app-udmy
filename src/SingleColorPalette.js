import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import sizes from "./sizes";

const styles = {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },

  colors: {
    height: "90%"
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    display: "inline-block",
    marginBottom: "-3.5px",
    fontFamily: "Roboto",
    opacity: "1",
    backgroundColor: "black",
    "& a": {
      color: "white",
      display: "inline-block",
      width: "100px",
      height: "30px",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontFamily: "Roboto",
      fontSize: "1rem",
      lineHeight: "30px",
      textDecoration: "none",
      textTransform: "uppercase",
      border: "none"
    },
    [sizes.down("lg")]: {
      width: "50%",
      height: "33.3333%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%"
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%"
    }
  }
};

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    // shades will never change so instead of adding to state, we bind to the component itself:
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    // console.log("this._shades", this._shades); // => this._shades (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
  }

  gatherShades(palette, colorsToFilterBy) {
    // return all shades of a given color
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorsToFilterBy)
      );
    }
    // removes the first item from the array as we only need shades from 100-900
    return shades.slice(1);
    // returns as: this._shades
  }

  changeFormat(val) {
    this.setState({ format: val });
  }
  render() {
    const { format } = this.state;
    const { classes, palette } = this.props;
    const { paletteName, emoji, id } = palette;
    // displays all shades of a single color from palette passed in via props:
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        {/* <span>SingleColor Palette</span> */}
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>Go Back</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
