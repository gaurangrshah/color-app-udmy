import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// https://v3.material-ui.com/demos/drawers/#drawer
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import arrayMove from "array-move";
// allows handling drag updates with arrays
import PaletteFormNav from "./PaletteFormNav";
import DraggableColorList from "./DraggableColorList";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./styles/NewPaletteFormStyles";

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      colors: this.props.palettes[0].colors.slice(-10)
    };
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addNewColor(newColor) {
    // sets state with new {color} and clears input for newName
    console.log("ran addNewColor");
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ""
    });
  }

  handleSubmit(newPalette) {
    // creates a new pallete that gets passed into savePallete
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    // create id "slug" from newPaletteName, regex replaces "spaces" w/ "-"
    newPalette.colors = this.state.colors;
    // calles savePallete from props passed in from <App />
    this.props.savePalette(newPalette);
    // access to history provided by "routeProps" from <App />
    this.props.history.push("/");
  }

  removeColor(colorName) {
    console.log("clicked remove", colorName);
    this.setState({
      // loop thru state and filter out any color.names that match colorName
      colors: this.state.colors.filter(color => color.name !== colorName)
      // returns a new array with the omitted color if a match was found.
    });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    // uses arrayMove to help re-organize colors array after each drag/sort
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  clearColors() {
    // resets: [colors]
    this.setState({ colors: [] });
  }

  addRandomColor() {
    // picks random color from existing palette
    // "flattens" all arrays to a single array: using .flat()
    const allColors = this.props.palettes.map(p => p.colors).flat();
    // generate random number using array length
    let rand = Math.floor(Math.random() * allColors.length);
    let randomColor = allColors[rand];
    console.log(allColors);
    // console.log(randomColor);
    // adds randomly generated color to current palette on state
    this.setState({ colors: [...this.state.colors, randomColor] });
  }

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
                className={classes.button}
              >
                CLEAR PALETTE
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={paletteIsFull}
                onClick={this.addRandomColor}
                className={classes.button}
              >
                RANDOM COLOR
              </Button>
            </div>
            <ColorPickerForm
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <ul className={classes.newBoxes}>
            <DraggableColorList
              colors={colors}
              removeColor={this.removeColor}
              onSortEnd={this.onSortEnd}
              axis="xy"
            />
          </ul>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
