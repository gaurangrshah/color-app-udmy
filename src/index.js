import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <h1>Palette List Here</h1>} />
      <Route
        exact
        path="/palette/:id"
        render={() => <Palette palette={generatePalette(seedColors[4])} />}
      />
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
