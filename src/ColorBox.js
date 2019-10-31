import React, { Component } from "react";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import chroma from "chroma-js"; // used below to handle dynamic text color
import "./ColorBox.css";

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
    const { name, background, paletteId, id, moreUrl, showLink } = this.props;
    const { copied } = this.state;
    // handle text-color dependent on current background-color luminescence
    // luminance returns all relative luminance values
    const isDarkColor = chroma(background).luminance() <= 0.07;
    // isDarkColor checks background value against defined throshold of '0.06'
    const isLightColor = chroma(background).luminance() >= 0.7;
    console.log(isDarkColor);
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background: background }} className="ColorBox">
          <div
            className={`copy-overlay ${copied && "show"} `}
            style={{ background }}
          />
          <div className={`copy-msg ${copied && "show"} `}>
            <h1>COPIED!</h1>
            <p className={`${isLightColor ? "dark-text" : null}`}>
              {background}
            </p>
          </div>
          <div className="copy-container ">
            <div className="box-content">
              <span className={isDarkColor ? "light-text" : null}>{name}</span>
            </div>
            <button
              className={`copy-button ${isLightColor ? "dark-text" : null}`}
            >
              Copy
            </button>
          </div>

          {showLink && ( // helps remove the "more" link on the singleColorPalette page
            <Link
              // moreUrl is the concatenated url to each palette from Palette.js
              // to={`/palette/${paletteId}/${id}`}
              to={moreUrl}
              /* using stopPropagation here allows us to click the link without firing the Copy Handler as well. */
              onClick={e => e.stopPropagation()}
            >
              <span className={`see-more ${isLightColor ? "dark-text" : null}`}>
                MORE
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
