import React, { Component } from "react";

import BikeStationList from "../../components/BikeStationList/BikeStationList";
import BikesAppBar from "../../components/BikesAppBar/BikesAppBar";

import Grid from "@material-ui/core/Grid";

import "./Results.css";

class Results extends Component {
  render() {
    return (
      <div className="results-wrapper">
        <BikesAppBar />
        <div className="resultslist-wrapper">
          <Grid container spacing={0} justify="center">
            <Grid item xs={10} className="stations-container">
              <BikeStationList />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Results;
