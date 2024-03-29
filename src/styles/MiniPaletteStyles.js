import sizes from "../sizes";

export default {
  // define classes:
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover svg": {
      opacity: "1"
    }
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "0.8rem",
    position: "relative",
    [sizes.down("sm")]: {
      fontSize: "0.6rem"
    },
    [sizes.down("xs")]: {
      fontSize: "1rem"
    }
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    position: "relative",
    marginBottom: "-3.5px"
  },
  deleteIcon: {
    color: "white",
    backgroundColor: "#eb3d30",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0px",
    top: "0px",
    padding: "10px",
    zIndex: "10",
    opacity: "0"
    // transition: "all 0.3s ease-in-out"
  },
  editIcon: {
    color: "white",
    backgroundColor: "blue",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0px",
    top: "1.68em",
    padding: "10px",
    zIndex: "10",
    opacity: "0"
    // transition: "all 0.3s ease-in-out"
  }
};
