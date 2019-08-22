import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import BikeStationsActions from "../Actions/BikeStationsActions";

import { Query, ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";


class BikesAPI extends Component {
  constructor() {
    super();

    this.state = {
      client: new ApolloClient({
        uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"
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

  getQueryForId(id) {
    return gql`
    {
      bikeRentalStation(id:"${id}") {
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
  }

  render() {
    let query = this.state.query
    const id = this.props.id

    if(id !== undefined) {
      query = this.getQueryForId(this.props.id)
    }

    return (
      <ApolloProvider client={this.state.client}>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (error) {
              console.log("error on graphql", error);
              return null
            }

            if(loading) {
              return false
            }

            if(id !== undefined) {
              BikeStationsActions.addOne(data.bikeRentalStation)
              return true
            }

            BikeStationsActions.addStations(data.bikeRentalStations);

            return true
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

BikesAPI.propTypes = {
  id: PropTypes.number
}

export default withRouter(BikesAPI);
