import sizes from "../sizes";

export default {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },

  colors: {
    height: "90%"
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    display: "inline-block",
    marginBottom: "-3.5px",
    fontFamily: "Roboto",
    opacity: "1",
    backgroundColor: "black",
    "& a": {
      color: "white",
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
      fontSize: "1rem",
      lineHeight: "30px",
      textDecoration: "none",
      textTransform: "uppercase",
      border: "none"
    },
    [sizes.down("lg")]: {
      width: "50%",
      height: "33.3333%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%"
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%"
    }
  }
};
