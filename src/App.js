import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Page from "./Page";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import EditPaletteForm from "./EditPaletteForm";

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
      palettes: savedPalettes.length <= 0 ? seedColors : savedPalettes
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
    // rendered a specific route that always matches,
    // this route always renders switch and allows for page transitions via:
    // react-transition-group below:
    return (
      <Route
        // destructure location from props
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={500}>
              {/* because we're now using "location" from props we need to make Switch aware of it as well */}
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <Page>
                      <NewPaletteForm
                        savePalette={this.savePalette}
                        palettes={this.state.palettes}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/edit/:paletteId"
                  render={routeProps => (
                    <Page>
                      <EditPaletteForm
                        updatePalette={this.savePalette}
                        paletteId={routeProps.match.params.paletteId}
                        palettes={this.state.palettes}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/"
                  // assigns and passes in routeProps, allowing access to browser's {history}
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  // renders PaletteList as a default route, in case no other routes match
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
