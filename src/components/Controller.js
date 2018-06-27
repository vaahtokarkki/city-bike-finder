import React, { Component } from "react";

import Form from "../scenes/Form/Form.js";
import Results from "../scenes/Results/Results.js";
import BikesAPI from "../services/BikesAPI.js";
import getGeolocation from "../services/Geolocation";

import { Route } from "react-router-dom";
import { withRouter } from "react-router";

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
      bikeStations: []
    };
  }

  onFormSubmit(params) {
    this.setState({
      apiParams: {
        minBikesLeft: params.minBikesLeft,
        resultsAmount: params.resultsAmount,
      },
      submitFromForm: true //To check if the query came from form page or browser's back button
    });
    this.props.history.push("/submit");
  }

  handleResults(params) {
    if (params === null) return;
    this.setState({
      bikeStations: params,
      submitFromForm: false //To check if the query came from form page or browser's back button
    });
    this.props.history.push("/stations");
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
    return (
      <div className="wrapper">
        <Route
          exact
          path="/"
          render={props => <Form submit={this.onFormSubmit.bind(this)} />}
        />
        <Route
          path="/submit"
          render={props => (
            <BikesAPI
              apiParams={this.state.apiParams}
              geolocation={this.state.geolocation}
              callback={this.handleResults.bind(this)}
              submitFromForm={this.state.submitFromForm}
            />
          )}
        />
        <Route
          exact
          path="/stations"
          render={props => <Results stations={this.state.bikeStations} />}
        />
      </div>
    );
  }
}

export default withRouter(Controller);
