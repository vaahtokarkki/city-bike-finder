import React, { Component } from "react";
import {HashRouter} from "react-router-dom";

import Controller from "./components/Controller.js";
import {startLocationTracking} from "./services/Geolocation";

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

  componentDidMount() {
    startLocationTracking()
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
