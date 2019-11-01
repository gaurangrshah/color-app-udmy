import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

class App extends Component {
  constructor(props) {
    super(props);
    // check for any locally saved palettes:
    let savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    // load local palettes (if any) else : load our seedColors

    this.state = {
      // only use saved palettes if there are any palettes on the array ||else: use seed palettes
      palettes: savedPalettes.length !== 0 ? savedPalettes : "" || seedColors
    };
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }

  savePalette(newPalette) {
    // gets called from newPaletteForm by handleSubmit
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }

  syncLocalStorage() {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }

  deletePalette(id) {
    this.setState(
      st => ({
        // filter thru all palettes and filter out the one with a matching id
        palettes: st.palettes.filter(palette => palette.id !== id)
      }),
      // updates local storage with current updated state
      this.syncLocalStorage
    );
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/palette/new"
            render={routeProps => (
              <NewPaletteForm
                savePalette={this.savePalette}
                palettes={this.state.palettes}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={routeProps => (
              // assigns and passes in routeProps, allowing access to browser's {history}
              <PaletteList
                palettes={this.state.palettes}
                {...routeProps}
                deletePalette={this.deletePalette}
              />
            )}
          />
          <Route
            exact
            path="/palette/:id"
            render={routeProps => (
              <Palette
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.id)
                )}
              />
            )}
          />
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            render={routeProps => (
              <SingleColorPalette
                colorId={routeProps.match.params.colorId}
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.paletteId)
                )}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
