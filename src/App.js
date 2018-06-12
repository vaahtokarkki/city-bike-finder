import React, { Component } from "react";

import Controller from './components/Controller.js'

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
      <div className="wrapper">
        <Controller />
      </div>
    );
  }
}

export default App;
