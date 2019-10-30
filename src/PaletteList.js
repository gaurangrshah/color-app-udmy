import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white"
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    girdGap: "5%"
  }
};
class PaletteList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { palettes, classes } = this.props;
    // classes represents the styles defined above, passed in by withStyles(HOC)
    return (
      <div className={this.props.classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors:</h1>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <p key={palette.id}>
                <MiniPalette {...palette} />
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
