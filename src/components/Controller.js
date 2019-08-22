import React, { Component } from "react";

import Form from "../scenes/Form/Form.js";
import Results from "../scenes/Results/Results.js";
import BikesAPI from "../services/BikesAPI.js";
import MapScene from "../scenes/Map/MapScene";

import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import StationDetails from "../scenes/StationDetails/StationDetails";

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

  onFormSubmit = () => {
    this.props.history.push("/stations");
  }

  

  render() {
    return (
      <div className="wrapper">
       <BikesAPI />
        <Route
          exact
          path="/"
          render={(props) => <Form {...props} submit={this.onFormSubmit.bind(this)} />}
        />
        <Route path="/station/:id" render={(props) => <StationDetails {...props} />} />
        <Route exact path="/stations" component={Results} />
        <Route exact path="/map" component={MapScene} />
      </div>
    );
  }
}

export default withRouter(Controller);
