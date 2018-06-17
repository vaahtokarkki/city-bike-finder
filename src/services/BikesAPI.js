import React, { Component } from "react";
import PropTypes from "prop-types";

import { Query, ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import { WaitingLocationScene } from "../scenes/WaitingLocation/WaitingLocationScene";
import LoadingAPI from "../components/LoadingAPI/LoadingAPI";
import ErrorAPI from "../components/ErrorAPI/ErrorAPI";

import sortBikeStations from "./SortBikeStations.js";


class BikesAPI extends Component {
  constructor() {
    super();

    this.state = {
      client: new ApolloClient({
        uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
        opts: {
          mode: "no-cors"
        }
      }),
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
    return !this.props.geolocation.userDennied && this.props.geolocation.location === null;
  }

  userDenniedLoaction() {
    return this.props.geolocation.userDennied;
  }

  render() {
    if(this.waitingLocation()) {
      return <WaitingLocationScene />
    } else if(this.userDenniedLoaction()) {
      return <WaitingLocationScene userDennied={this.props.geolocation.userDennied} />
    }
    
    return (
      <ApolloProvider client={this.state.client}>
        <Query query={this.state.query}>
          {({ loading, error, data }) => {
            if (loading) {
              return <LoadingAPI />;
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
              this.props.geolocation.location.coords.latitude,
              this.props.geolocation.location.coords.longitude
            );

            sorted = sorted.slice(0, this.props.resultsAmount);

            this.props.callback(sorted);
            return null;
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

BikesAPI.propTypes = {
  apiParams: PropTypes.object,
  geolocation: PropTypes.object,
  callback: PropTypes.func
};

export default BikesAPI;
