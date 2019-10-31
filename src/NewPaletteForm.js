import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// https://v3.material-ui.com/demos/drawers/#drawer
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// https://github.com/NewOldMax/react-material-ui-form-validator#readme
import { ChromePicker } from "react-color";
// https://casesandberg.github.io/react-color/
import DraggableColorBox from "./DraggableColorBox";

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
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      currentColor: "teal",
      newName: "",
      colors: []
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      name: this.state.newName
    };
    // sets state with new {color} and clears input for newName
    this.setState({ colors: [...this.state.colors, newColor], newName: "" });
  }

  handleChange(e) {
    this.setState({ newName: e.target.value });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
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
            <Button variant="contained" color="secondary">
              CLEAR PALETTE
            </Button>
            <Button variant="contained" color="primary">
              RANDOM COLOR
            </Button>
          </div>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={newColor => this.updateCurrentColor(newColor)}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={this.state.newName}
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
              style={{ backgroundColor: this.state.currentColor }}
              type="submit"
            >
              ADD COLOR
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
            {this.state.colors.map(color => (
              <DraggableColorBox color={color.color} name={color.name} />
            ))}
          </ul>
        </main>
      </div>
    );
  }
}

// note withStyles / withTheme
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
