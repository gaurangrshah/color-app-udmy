import React, { Component } from "react";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import chroma from "chroma-js"; // used below to handle dynamic text color
import { withStyles } from "@material-ui/styles";
import "./ColorBox.css";

const styles = {
  ColorBox: {
    width: "20%",
    height: props => (props.showingFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    display: "inline-block",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: "1",
      transition: "0.25s"
    }
  },
  copyText: {
    // function => resolves which color text to apply dynamically:
    color: props =>
      chroma(props.background).luminance() >= 0.7
        ? "rgba(0, 0, 0, 0.6)"
        : "white"
  },
  colorName: {
    color: props =>
      chroma(props.background).luminance() <= 0.08 ? "white" : "black"
  },
  seeMore: {
    color: props =>
      chroma(props.background).luminance() >= 0.7
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
    fontSize: "12px"
  },
  copyButton: {
    color: props =>
      chroma(props.background).luminance() >= 0.7
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    display: "inline-block",
    width: "100px",
    height: "30px",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontFamily: "Roboto",
    textDecoration: "none",
    fontSize: "1rem",
    lineHeight: "30px",
    textTransform: "uppercase",
    border: "none",
    opacity: "0"
  }
};

class ColorBox extends Component {
  constructor(props) {
    super(props);

    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    // console.log(this.props.background);
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    // paletteId and id can be removed if not being used: currently using moreUrl instead
    const {
      name,
      background,
      paletteId,
      id,
      moreUrl,
      showingFullPalette,
      classes
    } = this.props;
    // classes accessed from HOC withStyles / props
    const { copied } = this.state;
    // handle text-color dependent on current background-color luminescence
    // luminance returns all relative luminance values
    // const isDarkColor = chroma(background).luminance() <= 0.07;
    // isDarkColor checks background value against defined throshold of '0.06'
    // const isLightColor = chroma(background).luminance() >= 0.7;
    // console.log(isDarkColor);
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background: background }} className={classes.ColorBox}>
          <div
            className={`copy-overlay ${copied && "show"} `}
            style={{ background }}
          />
          <div className={`copy-msg ${copied && "show"} `}>
            <h1>COPIED!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div className="copy-container ">
            <div className="box-content">
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
