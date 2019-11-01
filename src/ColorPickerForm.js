import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// https://github.com/NewOldMax/react-material-ui-form-validator#readme
import { ChromePicker } from "react-color";
// https://casesandberg.github.io/react-color/

const styles = {
  picker: {
    width: "100%!important",
    marginTop: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem"
  },
  colorNameInput: {
    width: "100%",
    height: "70px"
  }
};

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentColor: "teal",
      newColorName: ""
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      // edited in refactor this.state.color => this.props.color
      return this.props.colors.every(
        // check input value against every name value in [colors]
        color => color.name.toLowerCase() !== value.toLowerCase()
        // returns value (either true or false) depending on above condition
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", value => {
      // edited in refactor this.state.color => this.props.color
      return this.props.colors.every(
        // check color agains each color value on the [colors]
        color => color.color !== this.state.currentColor
        // returns value (either true or false) depending on above condition
      );
    });
  }

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex, newColorName: "" });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    console.log("ran submit", newColor);
    this.props.addNewColor(newColor);
    this.setState({ newColorName: "" });
  }

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={newColor => this.updateCurrentColor(newColor)}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            name="newColorName"
            variant="filled"
            placeholder="Color Name"
            value={newColorName}
            onChange={this.handleChange}
            className={classes.colorNameInput}
            margin="normal"
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
              backgroundColor: paletteIsFull ? "grey" : currentColor
            }}
            type="submit"
            className={classes.addColor}
          >
            {paletteIsFull ? "PALETTE FULL" : "ADD COLOR"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
