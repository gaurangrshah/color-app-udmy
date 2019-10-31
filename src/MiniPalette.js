import React from "react";
import styles from "./styles/MiniPaletteStyles";
import { withStyles } from "@material-ui/styles";

function MiniPalette(props) {
  // access classes from props, defined above as "styles"
  const { classes, paletteName, emoji, colors, handleClick } = props;
  // creates a unique class name: classes: {main: "MiniPalette-main-1"}
  // console.log(classes);

  const miniColorBoxes = colors.map(color => {
    return (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    );
  });
  return (
    // use the unique className provided by withStyles from props:
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}
// export MiniPalette withStyles as an HOC
export default withStyles(styles)(MiniPalette);
