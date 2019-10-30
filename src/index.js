import React from "react";
import ReactDOM from "react-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";

function App() {
  return (
    <div className="App">
      <Palette colors={seedColors[2].colors} />
      <h2>Stage 1</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
