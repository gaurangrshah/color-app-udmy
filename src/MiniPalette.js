import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import styles from "./styles/MiniPaletteStyles";

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);

    this.deletePalette = this.deletePalette.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  deletePalette(e) {
    e.stopPropagation();
    // stop propogation stops any other events tied to the current element
    // no bubbleup
    this.props.openDialog(this.props.id);
  }

  handleClick() {
    this.props.goToPalette(this.props.id);
  }

  handleUpdateClick(e) {
    e.stopPropagation();
    console.log("updateClick");
    this.props.goToEditPalette(this.props.id);
  }

  render() {
    // access classes from props, defined above as "styles"
    const { classes, paletteName, emoji, colors } = this.props;
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
        <EditIcon
          className={classes.editIcon}
          // inline style to help overwrite component default transition
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={this.handleUpdateClick}
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
