import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyles.js";

class PaletteList extends Component {
  goToPalette(id) {
    // console.log("ran handleClick: gotopalette");
    // accessing the browser's {history} passed in via routeProps
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    // classes represents the styles defined above, passed into props by withStyles(HOC)
    const { palettes, classes, deletePalette } = this.props;
    return (
      <div className={this.props.classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors:</h1>
            <Link to="/palette/new">Create New</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <div key={palette.id}>
                <MiniPalette
                  {...palette}
                  handleClick={() => this.goToPalette(palette.id)}
                  handleDelete={deletePalette}
                  key={palette.id}
                  id={palette.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
