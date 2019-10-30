import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

const styles = {
  // define classes:
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer"
    }
  },
  colors: {
    backgroundColor: "grey"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1.5rem",
    position: "relative"
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
  }
};

function MiniPalette(props) {
  // access classes from props, defined above as "styles"
  const { classes, paletteName, emoji, id } = props;
  console.log(classes);
  // creates a unique class name: classes: {main: "MiniPalette-main-1"}
  return (
    // use the unique className provided by withStyles from props:
    <div className={classes.root}>
      <div className={classes.colors}>
        <h5 className={classes.title}>
          <Link exact to={`/palette/${id}`}>
            {paletteName}
          </Link>
          <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    </div>
  );
}
// export MiniPalette withStyles as an HOC
export default withStyles(styles)(MiniPalette);
