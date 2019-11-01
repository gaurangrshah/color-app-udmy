import sizes from "../sizes";
import bg from "./assets/bg.svg";

export default {
  "@global": {
    ".fade-exit": {
      opacity: "1"
    },
    ".fade-exit-active": {
      opacity: "0",
      transition: "opacity 300ms ease-out"
    }
  },
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    fontFamily: "Roboto",
    /* background by SVGBackgrounds.com */
    backgroundColor: "#ff0000",
    background: `url(${bg})`,
    backgroundSize: "auto auto",
    overflow: "scroll",
    padding: "20px"
  },
  heading: {
    fontSize: "2rem"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",

    [sizes.down("xl")]: {
      width: "80%"
    },
    [sizes.down("xs")]: {
      width: "75%"
    }
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
      backgroundColor: "#2579b1",
      textDecoration: "none",
      marginRight: "3em",
      fontWeight: "400",
      [sizes.down("md")]: {
        marginRight: "1em"
      }
    }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    girdGap: "1.5rem",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      girdGap: "1.4rem"
    }
  }
};
