import React, { Component } from "react";

import Form from "../scenes/Form/Form.js";
import Results from "../scenes/Results/Results.js";
import BikesAPI from "../services/BikesAPI.js";
import MapScene from "../scenes/Map/MapScene";

import getGeolocation from "../services/Geolocation";

import { Route } from "react-router-dom";
import { withRouter } from "react-router";

class Controller extends Component {
  constructor() {
    super();

    this.state = {
      apiParams: {
        minBikesLeft: 1,
        resultsAmount: 5
      }
    };
  }

  onFormSubmit(params) {
    this.setState({
      apiParams: {
        minBikesLeft: params.minBikesLeft,
        resultsAmount: params.resultsAmount
      },
      submitFromForm: true //To check if the query came from form page or browser's back button
    });
    this.props.history.push("/submit");
  }

  componentDidMount() {
    getGeolocation();
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
              submitFromForm={this.state.submitFromForm}
            />
          )}
        />
        <Route exact path="/stations" component={Results} />
        <Route exact path="/map" component={MapScene} />
      </div>
    );
  }
}

export default withRouter(Controller);
