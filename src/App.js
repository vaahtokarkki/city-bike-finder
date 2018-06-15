import React, { Component } from "react";
import {HashRouter} from "react-router-dom";

import Controller from "./components/Controller.js";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      stations: []
    };
  }

  onChangeStations(stations) {
    this.setState({
      stations: stations
    });
  }

  render() {
    return (
        <HashRouter>
          <Controller />
        </HashRouter>
    );
  }
}

export default App;
