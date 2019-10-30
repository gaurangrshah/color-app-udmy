import React, { Component } from "react";
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
