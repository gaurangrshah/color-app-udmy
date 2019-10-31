import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

function Index() {
  return <App />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
