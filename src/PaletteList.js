import React, { Component } from "react";
import MiniPalette from "./MiniPalette";

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
            <MiniPalette {...palette} />
          </p>
        ))}
      </div>
    );
  }
}

export default PaletteList;
