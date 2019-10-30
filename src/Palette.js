import React, { Component } from "react";

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    console.log(this.props);
    return (
      <div className="Palette">
        {/* Navbar will go here */}
        <div className="Palette-colors">{/* color boxes go here */}</div>
        {/* footer will go here */}
      </div>
    );
  }
}

export default Palette;
