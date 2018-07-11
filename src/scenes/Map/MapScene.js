import React, { Component } from "react";
import GeolocationStore from "../../stores/GeolocationStore";

import BikesAppBar from "../../components/BikesAppBar/BikesAppBar";
import { WaitingLocationScene } from "../../scenes/WaitingLocation/WaitingLocationScene";
import MapComponent from "../../components/MapComponent/MapComponent";

import "./MapScene.css";

class MapScene extends Component {
  constructor() {
    super();
    this.state = { geolocation: GeolocationStore.getLocation() };
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({
      geolocation: GeolocationStore.getLocation()
    });
  }

  componentWillMount() {
    GeolocationStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    GeolocationStore.addChangeListener(this._onChange);
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
      <div className="map-wrapper">
        <BikesAppBar />
        <MapComponent geolocation={this.state.geolocation} />
      </div>
    );
  }
}

export default MapScene;
