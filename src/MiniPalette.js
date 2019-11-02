import React, { PureComponent } from "react";
import styles from "./styles/MiniPaletteStyles";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);

    this.deletePalette = this.deletePalette.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  deletePalette(e) {
    e.stopPropagation();
    // stop propogation stops any other events tied to the current element
    // no bubbleup
    this.props.openDialog(this.props.id);
  }

  handleClick() {
    // console.log(this.props.id);
    this.props.goToPalette(this.props.id);
  }

  render() {
    // access classes from props, defined above as "styles"
    const { classes, paletteName, emoji, colors } = this.props;
    // console.log("rendering", paletteName);
    // creates a unique class name: classes: {main: "MiniPalette-main-1"}
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
      <div className={classes.root} onClick={this.handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          // inline style to help overwrite component default transition
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={this.deletePalette}
        />

        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName}
          <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}
// export MiniPalette withStyles as an HOC
export default withStyles(styles)(MiniPalette);
