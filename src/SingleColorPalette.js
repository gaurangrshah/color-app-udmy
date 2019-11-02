import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/SingleColorPaletteStyles";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    // shades will never change so instead of adding to state, we bind to the component itself:
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    // => this._shades (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
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
