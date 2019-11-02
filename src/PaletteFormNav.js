import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import PaletteMetaForm from "./PaletteMetaForm";
import styles from "./styles/PaletteFormNavStyles";

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);

    this.state = { newPaletteName: "", formShowing: false };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  showForm() {
    this.setState({ formShowing: true });
  }
  hideForm() {
    this.setState({ formShowing: false });
  }

  render() {
    const {
      classes,
      open,
      handleSubmit,
      handleDrawerOpen,
      palettes
    } = this.props;

    const { formShowing } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              // className={classNames(classes.menuButton, open && classes.hide)}
              className={classNames(classes.menuButton, {
                [classes.hide]: open
              })}
              // when 'open' = true, the icon is hidden, note both valid syntax examples above
            >
              <LibraryAddIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {!open && "Create A New palette"}
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link to="/">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                GO BACK
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={this.showForm}
              className={classes.button}
            >
              SAVE
            </Button>
          </div>
        </AppBar>
        {formShowing && (
          <PaletteMetaForm
            palettes={palettes}
            handleSubmit={handleSubmit}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
