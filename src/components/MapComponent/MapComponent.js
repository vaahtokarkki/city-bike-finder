import React, { Component } from "react";
import PropTypes from "prop-types";

import BikeStationStore from "../../stores/BikeStationStore";

import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { DivIcon } from "leaflet";

import "./MapComponent.css";

class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      stationsObject: BikeStationStore.getAllItems(),
      zoom: 15
    };
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({
      stations: BikeStationStore.getAllItems()
    });
  }

  componentWillMount() {
    BikeStationStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    BikeStationStore.removeChangeListener(this._onChange);
  }

  addStations() {
    if (this.state.stationsObject.stations === undefined || this.state.stationsObject.stations.length === 0)
      return [];

    let arrayOfMarkes = this.state.stationsObject.stations.map((s, i) => {
      const pos = [s.station.lat, s.station.lon];
      let stationIcon = new DivIcon({
        className: "station-icon",
        html: s.station.bikesAvailable
      });
      const marker = (
        <Marker position={pos} key={i} icon={stationIcon}>
          <Popup className="popup">
            <span>
              <div className="title">{s.station.name}</div>
              <div className="description">
                Pyöriä jäljellä: {s.station.bikesAvailable} kpl
                <br />
                Etäisyys {s.distance} metriä
              </div>
            </span>
          </Popup>
        </Marker>
      );
      return marker;
    });
    return arrayOfMarkes;
  }

  render() {
    const userCoords = this.props.geolocation.location.coords;
    const position = [userCoords.latitude, userCoords.longitude];
    const markers = this.addStations();

    let radius = this.props.geolocation.location.coords.accuracy;
    if (radius > 80) {
      radius = 80;
    } else if (radius < 40) {
      radius = 40;
    }

    return (
      <Map center={position} zoom={this.state.zoom} className="map">
        <TileLayer
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url=" https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}@2x.png"
        />
        <Circle
          center={position}
          radius={radius}
          stroke={false}
          fillOpacity={0.4}
        />
        <Circle center={position} radius={5} stroke={false} fillOpacity={1} />
        {markers}
      </Map>
    );
  }
}

MapComponent.propTypes = {
  geolocation: PropTypes.object.isRequired
};

export default MapComponent;
