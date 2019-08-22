import React, { Component } from "react";
import { withRouter } from "react-router";

import BikeStationList from "../../components/BikeStationList/BikeStationList";
import BikesAppBar from "../../components/BikesAppBar/BikesAppBar";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import "./Results.css";

import {sortBikeStations,filterStations} from "../../services/SortBikeStations";
import FilterStore from "../../stores/FilterStore";
import BikeStationStore from "../../stores/BikeStationStore";

class Results extends Component {
  constructor() {
    super()


    this.state = {
      stations : []
    }
  }

  getStations = () => {
    const allStations = BikeStationStore.getAllItems()
    const sortedStations = sortBikeStations(allStations)
    const filter = FilterStore.getFilter()

    return filterStations(sortedStations, filter.minBikesAvailable, filter.results)
  }

  onClickShowMap() {
    this.props.history.push("/map");
  }

  render() {
    if(BikeStationStore.isEmpty()) {
      this.props.history.push("/")
      return null
    }

    const results = this.getStations()
    return (
      <div className="results-wrapper">
        <BikesAppBar />
        <div className="resultslist-wrapper">
          <Grid container spacing={0} justify="center">
            <Grid item xs={10} className="stations-container">
              <BikeStationList stations={results} />
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
