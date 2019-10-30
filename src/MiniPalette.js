import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  // define classes:
  main: {
    backgroundColor: "purple",
    border: "3px solid teal"
  },
  // classes can also be nested:
  secondary: {
    backgroundColor: "Pink",
    "&h1": {
      color: "white",
      "& span": {
        backgroundColor: "yellow"
      }
    }
  }
};

function MiniPalette(props) {
  // access classes from props, defined above as "styles"
  const { classes } = props;
  console.log(classes);
  // creates a unique class name: classes: {main: "MiniPalette-main-1"}
  return (
    // use the unique className provided by withStyles from props:
    <div className={classes.main}>
      <h1>MiniPalette</h1>
      <section className={classes.secondary}>
        <h1>MiniPalette Palettes:</h1>
        <span>This is a span</span>
      </section>
    </div>
  );
}
// export MiniPalette withStyles as an HOC
export default withStyles(styles)(MiniPalette);
