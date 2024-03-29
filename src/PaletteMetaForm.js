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
    const isEditing = this.props.editing;
    this.state = {
      newPaletteName: "",
      currentPaletteName: this.props.paletteName,
      stage: isEditing ? "edit" : "form"
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      return (
        // added conditional to allow updating with an "edit" stage
        this.state.stage !== "edit" &&
        this.props.palettes.every(
          // check newPaletteName agains each paletteName value on the [palette]
          palette => palette.paletteName.toLowerCase() !== value.toLowerCase()
          // returns value (either true or false) depending on above condition
        )
      );
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  savePalette(emoji) {
    console.log("save");
    const newPalette = {
      paletteName: this.state.newPaletteName || this.state.currentPaletteName,
      emoji: emoji.native
    };
    this.setState({ stage: "" });
    this.props.handleSubmit(newPalette);
  }

  showEmojiPicker() {
    this.setState({ stage: "emoji" });
  }

  // handleSubmit() {
  //   console.log("hnadleSubmit");
  // }

  render() {
    const { newPaletteName, stage, currentPaletteName } = this.state;
    const { hideForm, editing } = this.props;
    return (
      <div>
        <Dialog open={stage === "emoji"} onClose={hideForm}>
          <DialogTitle id="form-dialog-title">Select An Emoji</DialogTitle>
          <Picker onSelect={this.savePalette} />
        </Dialog>

        <Dialog
          open={stage === "form"}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a palette name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. Make sure it
                is unique!
              </DialogContentText>
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
        <Dialog
          open={stage === "edit"}
          onClose={hideForm}
          aria-labelledby="edit-form-dialog-title"
        >
          <DialogTitle id="edit-form-dialog-title">
            Choose a palette name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. Make sure it
                is unique!
              </DialogContentText>
              <TextValidator
                name="currentPaletteName"
                label="Palette Name"
                value={currentPaletteName}
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={["required"]}
                errorMessages={["enter a valid palette name"]}
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
                Update Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
