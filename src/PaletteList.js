import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";

class PaletteList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { palettes } = this.props;
    return (
      <div>
        <MiniPalette />
        {palettes.map(palette => (
          <p key={palette.id}>
            <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
          </p>
        ))}
      </div>
    );
  }
}

export default PaletteList;
