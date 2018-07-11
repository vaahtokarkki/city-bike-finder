import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import BikeStationsActions from "../Actions/BikeStationsActions";
import GeolocationStore from "../stores/GeolocationStore";

import { Query, ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import { WaitingLocationScene } from "../scenes/WaitingLocation/WaitingLocationScene";
import LoadingStations from "../scenes/LoadingStations/LoadingStations";
import ErrorAPI from "../components/ErrorAPI/ErrorAPI";

import sortBikeStations from "./SortBikeStations.js";

class BikesAPI extends Component {
  constructor() {
    super();

    this.state = {
      client: new ApolloClient({
        uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"
      }),
      geolocation: GeolocationStore.getLocation(),
      query: gql`
        {
          bikeRentalStations {
            stationId
            name
            bikesAvailable
            spacesAvailable
            lat
            lon
            allowDropoff
            state
          }
        }
      `
    };
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({ geolocation: GeolocationStore.getLocation() });
  }

  componentWillUnmount() {
    GeolocationStore.removeChangeListener(this._onChange);
  }

  componentWillMount() {
    GeolocationStore.addChangeListener(this._onChange);

    if (!this.props.submitFromForm) {
      window.history.go(-1);
    }
  }

  parseData(data, amount) {
    /*
  Parse bikestations based bikes left on the station.
  Use negative number for getting only empty stations
  */

    data = data.filter(({ state }) => state === "Station on");

    if (amount < 0) {
      return data.filter(({ bikesAvailable }) => bikesAvailable === 0);
    }
    return data.filter(({ bikesAvailable }) => bikesAvailable >= amount);
  }

  waitingLocation() {
    if (this.state.geolocation == null || this.state.geolocation.userDennied) {
      return true;
    }

    return false;
  }

  render() {
    if (this.waitingLocation()) {
      return <WaitingLocationScene />;
    }

    return (
      <ApolloProvider client={this.state.client}>
        <Query query={this.state.query}>
          {({ loading, error, data }) => {
            if (loading) {
              return <LoadingStations />;
            }
            if (error) {
              console.log("error on graphql", error);
              return <ErrorAPI />;
            }

            let bikeStations = data.bikeRentalStations;
            let parsed = this.parseData(
              bikeStations,
              this.props.apiParams.minBikesLeft
            );

            let sorted = sortBikeStations(
              parsed,
              this.props.apiParams.resultsAmount,
              this.state.geolocation.location.coords.latitude,
              this.state.geolocation.location.coords.longitude
            );

            sorted = sorted.slice(0, this.props.resultsAmount);

            BikeStationsActions.addStations(sorted);
            this.props.history.push("/stations");

            return null;
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

BikesAPI.propTypes = {
  apiParams: PropTypes.object,
  submitFromForm: PropTypes.bool //To check if the query came from form page or browser's back button
};

export default withRouter(BikesAPI);
