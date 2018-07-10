import React, { Component } from "react";
import { withRouter } from "react-router";

import BikeStationList from "../../components/BikeStationList/BikeStationList";
import BikesAppBar from "../../components/BikesAppBar/BikesAppBar";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import "./Results.css";

class Results extends Component {
  onClickShowMap() {
    this.props.history.push("/map");
  }

  render() {
    return (
      <div className="results-wrapper">
        <BikesAppBar />
        <div className="resultslist-wrapper">
          <Grid container spacing={0} justify="center">
            <Grid item xs={10} className="stations-container">
              <BikeStationList />
            </Grid>
            <Grid item xs={10} align="center">
              <Button
                variant="outlined"
                color="primary"
                className="button-outlined"
                onClick={this.onClickShowMap.bind(this)}
              >
                NÄYTÄ ASEMAT KARTALLA
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(Results);
