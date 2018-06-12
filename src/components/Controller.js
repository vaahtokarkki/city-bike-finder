import React, { Component } from "react";

import Form from "../scenes/Form/Form.js";
import Header from "./Header/Header.js";
import Results from "../scenes/Results/Results.js";
import BikesAPI from "../services/BikesAPI.js";
import getGeolocation from "../services/Geolocation";

class Controller extends Component {
  constructor() {
    super();

    this.state = {
      geolocation: {
        userDennied: false,
        location: null
      },
      apiParams: {
        minBikesLeft: 1,
        resultsAmount: 5
      },
      queryStatus: false,
      bikeStations: []
    };
  }

  showForm() {
    this.setState({
      queryStatus: false
    });
  }

  onFormSubmit(params) {
    this.setState({
      apiParams: {
        minBikesLeft: params.minBikesLeft,
        resultsAmount: params.resultsAmount
      },
      queryStatus: true
    });
  }

  handleResults(params) {
    if (params === null) return;
    this.setState({
      queryStatus: "finished",
      bikeStations: params
    });
  }

  handleGetGeolocation(params) {
    this.setState({
      geolocation: params
    });
  }

  componentDidMount() {
    getGeolocation(this.handleGetGeolocation.bind(this));
  }

  render() {
    if (this.state.queryStatus === true) {
      return (
        <BikesAPI
          apiParams={this.state.apiParams}
          geolocation={this.state.geolocation}
          callback={this.handleResults.bind(this)}
        />
      );
    } else if (this.state.queryStatus === "finished") {
      return (
        <Results
          stations={this.state.bikeStations}
          backFunc={this.showForm.bind(this)}
        />
      );
    }

    return (
      <div className="form-wrapper">
        <Header />
        <Form submit={this.onFormSubmit.bind(this)} />
      </div>
    );
  }
}

export default Controller;
