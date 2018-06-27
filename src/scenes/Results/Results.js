import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import BikeStationList from "./BikeStationList.js";
import BikesAppBar from "../../components/BikesAppBar/BikesAppBar";

import Grid from "@material-ui/core/Grid";

import "./Results.css";

class Results extends Component {
  render() {
    if (this.props.stations.length === 0) {
      this.props.history.push("/");
      return null;
    }

    return (
      <div className="results-wrapper">
        <BikesAppBar />
        <div className="resultslist-wrapper">
          <Grid container spacing={0} justify="center">
            <Grid item xs={10}>
              <BikeStationList stations={this.props.stations} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  stations: PropTypes.array.isRequired
};

export default withRouter(Results);
