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
import { generatePalette } from "./colorHelpers";

import PaletteFormNav from "./PaletteFormNav";
import DraggableColorList from "./DraggableColorList";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./styles/NewPaletteFormStyles";
import seedColors from "./seedColors";

class EditPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
    palettes: []
  };
  constructor(props) {
    super(props);
    let paletteId = this.props.match.params.paletteId;
    this._getPalette = this.props.palettes.find(function(palette) {
      return palette.id === paletteId;
    });

    console.log(this._getPalette);

    this.state = {
      open: true,
      colors: this._getPalette.colors || [],
      id: this.props.match.params.paletteId
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
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ""
    });
  }

  handleSubmit(updatedPalette) {
    console.log("updatedPalette", updatedPalette);
    // creates a new pallete that gets passed into savePallete
    updatedPalette.id = updatedPalette.paletteName
      .toLowerCase()
      .replace(/ /g, "-");
    // create id "slug" from newPaletteName, regex replaces "spaces" w/ "-"
    updatedPalette.colors = this.state.colors;
    // calles savePallete from props passed in from <App />
    this.props.updatePalette(updatedPalette);
    // access to history provided by "routeProps" from <App />
    this.props.history.push("/");
  }

  removeColor(colorName) {
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
    // "flattens" all arrays to a single array: using .flat() then filters to check for matching names
    const allColorNames = new Set(this.state.colors.map(color => color.name));
    const allFilteredColors = this.props.palettes
      .map(p => p.colors)
      .flat()
      .filter(color => !allColorNames.has(color.name));

    // generate random number using array length
    let rand = Math.floor(Math.random() * allFilteredColors.length);
    let randomColor = allFilteredColors[rand];

    // adds randomly generated color to current palette on state
    this.setState({ colors: [...this.state.colors, randomColor] });
  }

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;
    console.log(this.props, this.props.palettes);
    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
          paletteName={this._getPalette.paletteName}
          editing={true}
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
              Add a New Color
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
              distance={10} // fixes bug where sort events swell up and do not allow delete icon to be clicked
              // item must be dragged minimum: 10px for it to register as a drag event.
              axis="xy"
            />
          </ul>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EditPaletteForm);
