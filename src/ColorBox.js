import React, { Component } from "react";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorBoxStyles";

class ColorBox extends Component {
  constructor(props) {
    super(props);

    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    const {
      name,
      background,
      moreUrl,
      showingFullPalette,
      classes
    } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background: background }} className={classes.ColorBox}>
          <div
            className={`${classes.copyOverlay} ${copied &&
              classes.showOverlay} `}
            style={{ background }}
          />
          <div className={`${classes.copyMsg} ${copied && classes.showMsg} `}>
            <h1>COPIED!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>

          {showingFullPalette && ( // helps remove the "more" link on the singleColorPalette page
            <Link
              // moreUrl is the concatenated url to each palette from Palette.js
              // to={`/palette/${paletteId}/${id}`}
              to={moreUrl}
              /* using stopPropagation here allows us to click the link without firing the Copy Handler as well. */
              onClick={e => e.stopPropagation()}
            >
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
