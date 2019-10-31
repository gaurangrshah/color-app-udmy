import React, { Component } from "react";
import ColorBox from "./ColorBox";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    // shades will never change so instead of adding to state, we bind to the component itself:
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    // console.log("this._shades", this._shades); // => this._shades (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
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
  render() {
    // displays all shades of a single color from palette passed in via props:
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.id}
        name={color.name}
        background={color.hex}
        showLink={false}
      />
    ));
    return (
      <div className="Palette">
        <span>SingleColor Palette</span>
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default SingleColorPalette;
