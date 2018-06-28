import React, { Component } from "react";
import PropTypes from "prop-types";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import {DivIcon} from "leaflet";

import "./MapComponent.css";

class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      stations: [
        {
          distance: 25,
          station: {
            name: "Test station",
            lat: 60.1,
            lon: 24.93,
            bikesAvailable: 5
          }
        },
        {
          distance: 50,
          station: {
            name: "Test station 2",
            lat: 60.11,
            lon: 24.94,
            bikesAvailable: 1
          }
        },
        {
          distance: 100,
          station: {
            name: "Test station",
            lat: 60.09,
            lon: 24.83,
            bikesAvailable: 0
          }
        }
      ],
      zoom: 13
    };
  }

  addStations() {
    if(this.props.stations.length === 0) return [];
    
    let arrayOfMarkes = this.props.stations.map((s, i)  => {
      const pos = [s.station.lat, s.station.lon];
      let stationIcon = new DivIcon({className: 'station-icon', html:i+1});
      const marker = (
        <Marker position={pos} key={i} icon={stationIcon}>
          <Popup className="popup">
            <span>
              <b>{s.station.name}</b>
              <br />
              <span>Pyöriä jäljellä: {s.station.bikesAvailable}</span>
              <br />
              <span>Etäisyys {s.distance} metriä</span>
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
    
    return (
      <Map center={position} zoom={this.state.zoom} className="map">
        <TileLayer
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url=" https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}.png"
        />
        <Marker position={position} >
          <Popup className="popup">
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
        {markers}
      </Map>
    );
  }
}

MapComponent.propTypes = {
  stations: PropTypes.array.isRequired,
  geolocation: PropTypes.object.isRequired
};

export default MapComponent;
