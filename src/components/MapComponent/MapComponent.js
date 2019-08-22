import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import FilterStore from "../../stores/FilterStore"
import BikeStationStore from "../../stores/BikeStationStore";
import {sortBikeStations, filterStations} from "../../services/SortBikeStations";

import { Map, TileLayer, Marker, Circle } from "react-leaflet";
import { DivIcon } from "leaflet";
import {parse} from "query-string"

import "./MapComponent.css";

class MapComponent extends Component {
  constructor() {
    super();

    const initial = this.getStationsWithFilter()

    this.state = {
      stations: initial,
      zoom: 15,
      map: null
    };
    this._onChange = this._onChange.bind(this);
  }

  getStationsWithFilter() {
    const allStations = BikeStationStore.getAllItems()
    const sortedStations = sortBikeStations(allStations)
    const filter = FilterStore.getFilter()

    return filterStations(sortedStations, filter.minBikesAvailable, allStations.length)
  }

  _onChange() {
    const updatedStations = this.getStationsWithFilter()

    this.setState({
      stations: updatedStations
    });
  }

  componentWillMount() {
    BikeStationStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    const map = this.refs.map.leafletElement
    this.setState({
      map:map
    })
  }

  componentWillUnmount() {
    BikeStationStore.removeChangeListener(this._onChange);
  }

  onClick(id) {
    this.props.history.push(`/station/${id}`)
  }

  getUrlParams() {
    const parsed = parse(this.props.location.search, { ignoreQueryPrefix: true })

    if(parsed.lat && parsed.lon && parsed.zoom) {
      return {
        lat: parseFloat(parsed.lat),
        lon: parseFloat(parsed.lon),
        zoom: parseFloat(parsed.zoom)
      }
    }
    return false
  }

  updateUrlParams(e) {
    const target = e.target
    const center = target.getCenter()

    const lat = center.lat
    const lon = center.lng
    const zoom = target.getZoom()

    this.props.history.replace({
      pathname: '/map',
      search: `?lat=${lat}&lon=${lon}&zoom=${zoom}`
    })
  }

  addStations() {
    if (this.state.stations === null || this.state.stations.length === 0)
      return [];

    let arrayOfMarkes = this.state.stations.map((s, i) => {
      const pos = [s.station.lat, s.station.lon];
      
      let stationIcon = new DivIcon({
        className: "station-icon",
        html: s.station.bikesAvailable
      });

      return <Marker position={pos} key={i} icon={stationIcon} onclick={() => this.onClick(s.station.stationId)} />
    });
    return arrayOfMarkes;
  }

  render() {
    const userCoords = this.props.geolocation.location.coords;
    const params = this.getUrlParams()

    const position = [userCoords.latitude, userCoords.longitude];
    const center = (params) ? [params.lat, params.lon] : position;
    const zoom = (params) ? params.zoom : 15;
    
    const markers = this.addStations();

    let radius = this.props.geolocation.location.coords.accuracy;
    if (radius > 80) {
      radius = 80;
    } else if (radius < 40) {
      radius = 40;
    }

    return (
      <Map ref="map" center={center} zoom={zoom} className="map" onMoveend={(e) => this.updateUrlParams(e)} onzoomend={(e) => this.updateUrlParams(e)}>
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

export default withRouter(MapComponent);
