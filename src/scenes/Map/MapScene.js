import React, { Component } from "react";
import PropTypes from "prop-types";

import BikesAppBar from "../../components/BikesAppBar/BikesAppBar";
import MapComponent from "../../components/MapComponent/MapComponent";
import WaitingLocationScene from "../WaitingLocation/WaitingLocationScene";

import "./MapScene.css";

class MapScene extends Component {
  waitingLocation() {
    return (
      !this.props.geolocation.userDennied &&
      this.props.geolocation.location === null
    );
  }

  render() {
    if (this.waitingLocation()) {
      return (
        <WaitingLocationScene
          userDennied={this.props.geolocation.userDennied}
        />
      );
    }

    return (
      <div className="map-wrapper">
        <BikesAppBar />
        <MapComponent
          stations={this.props.stations}
          geolocation={this.props.geolocation}
        />
      </div>
    );
  }
}

MapScene.propTypes = {
  stations: PropTypes.array.isRequired,
  geolocation: PropTypes.object.isRequired
};

export default MapScene;
