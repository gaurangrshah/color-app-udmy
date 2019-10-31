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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// https://github.com/NewOldMax/react-material-ui-form-validator#readme
import { ChromePicker } from "react-color";
// https://casesandberg.github.io/react-color/
import arrayMove from "array-move";
// allows handling drag updates with arrays
import PaletteFormNav from "./PaletteFormNav";
import DraggableColorList from "./DraggableColorList";

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  newBoxes: {
    // screen height - appBar height
    height: "calc(100vh - 64px)"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      currentColor: "teal",
      newColorName: "",
      colors: this.props.palettes[0].colors.slice(-10)
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      return this.state.colors.every(
        // check input value against every name value in [colors]
        color => color.name.toLowerCase() !== value.toLowerCase()
        // returns value (either true or false) depending on above condition
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", value => {
      return this.state.colors.every(
        // check color agains each color value on the [colors]
        color => color.color !== this.state.currentColor
        // returns value (either true or false) depending on above condition
      );
    });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  }

  addNewColor() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    // sets state with new {color} and clears input for newName
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ""
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // updates handleSubmit to be passed into <PaletteFormNav/>
  handleSubmit(newPaletteName) {
    // temporarily hard coded palette name
    // creates a new pallete that gets passed into savePallete
    const newPalette = {
      paletteName: newPaletteName,
      // create id "slug" from newPaletteName, regex replaces "spaces" w/ "-"
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    };
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

  // update randomColor to ensure no duplicates are able to get added
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
          classes={classes}
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
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearColors}
            >
              CLEAR PALETTE
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={paletteIsFull}
              onClick={this.addRandomColor}
            >
              RANDOM COLOR
            </Button>
          </div>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={newColor => this.updateCurrentColor(newColor)}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              name="newColorName"
              value={this.state.newColorName}
              onChange={this.handleChange}
              // adds validation, and respective error message feedback:
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "enter a valid color name",
                "color name must be unique",
                "color already used"
              ]}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={paletteIsFull}
              style={{
                backgroundColor: paletteIsFull
                  ? "grey"
                  : this.state.currentColor
              }}
              type="submit"
            >
              {paletteIsFull ? "PALETTE FULL" : "ADD COLOR"}
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <ul className={classes.newBoxes}>
            <DraggableColorList
              // axis defines which directions draggable sort applies to:
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

// note withStyles / withTheme
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
