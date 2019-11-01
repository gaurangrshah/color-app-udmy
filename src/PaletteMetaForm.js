import React, { Component } from "react";
// https://v3.material-ui.com/demos/dialogs/
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// https://github.com/NewOldMax/react-material-ui-form-validator#readme
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
// https://github.com/missive/emoji-mart

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPaletteName: "",
      open: true
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      return this.props.palettes.every(
        // check newPaletteName agains each paletteName value on the [palette]
        palette => palette.paletteName.toLowerCase() !== value.toLowerCase()
        // returns value (either true or false) depending on above condition
      );
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  addEmoji(e) {
    console.log(e.target.value);
  }

  render() {
    const { newPaletteName } = this.state;
    const { handleSubmit, hideForm } = this.props;
    return (
      <Dialog
        open={this.state.open}
        onClose={hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
        <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it
              is unique!
            </DialogContentText>
            <Picker onSelect={this.addEmoji} />
            <TextValidator
              name="newPaletteName"
              label="Palette Name"
              value={newPaletteName}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "enter a valid palette name",
                "name already used"
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              // onClick={this.handleSubmit}
            >
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default PaletteMetaForm;
