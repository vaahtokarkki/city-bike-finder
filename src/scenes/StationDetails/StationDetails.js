import React, { Component } from "react";
import { withRouter } from "react-router";
import { Map, TileLayer, Marker, Circle} from "react-leaflet";

import BikeStationStore from "../../stores/BikeStationStore";
import GeolocationStore from "../../stores/GeolocationStore"

import LoadingStations from "../LoadingStations/LoadingStations"
import BikesAppBar from "../../components/BikesAppBar/BikesAppBar"
import BikeStationDetails from "../../components/BikeStationDetails/BikeStationDetails"
import { settings } from "../../settings"


import './StationDetails.css'

class StationDetails extends Component {

    constructor() {
        super()
        let geoloc = GeolocationStore.getLocation()
        if(!geoloc) 
            geoloc = settings['DEFAULT_LOCATION']
        
        this.state = {
            station: undefined,
            geolocation: geoloc
        }
        this._geolocationOnChange = this._geolocationOnChange.bind(this)
        this._bikeStationOnChange = this._bikeStationOnChange.bind(this);
    }

    _bikeStationOnChange() {
        this.getStation()
    }

    _geolocationOnChange() {
        this.setState({
            geolocation: GeolocationStore.getLocation()
        });
    }

    componentWillMount() {
        BikeStationStore.addChangeListener(this._bikeStationOnChange);
        GeolocationStore.addChangeListener(this._geolocationOnChange);
    }

    componentWillUnmount() {
        BikeStationStore.removeChangeListener(this._bikeStationOnChange);
        GeolocationStore.removeChangeListener(this._geolocationOnChange)
    }

    componentDidMount() {
        this.getStation()
    }

    getStation() {
        const id = this.props.match.params.id

        if(!id) {
            this.setState({
                station: false
            })
            return
        }

        const stations = BikeStationStore.getOneStation(id)
        const loading = BikeStationStore.isLoading()

        if (loading) {
            return
        }

        if(stations.length === 0) {
            this.setState({
                station: false
            });
            return
        }

        this.setState({
          station: stations
        });
    }


    render() {
        let { station } = this.state
        if(station === undefined)
            return <LoadingStations />
        else if (!station)
            return <h1>error</h1>
        
        station = this.state.station[0]

        const position = [station.lat, station.lon];
        
        const geoloc =  this.state.geolocation.location.coords
        const userPosition = [geoloc.latitude, geoloc.longitude]

        let radius = geoloc.accuracy;
        if (radius > 160) {
            radius = 80;
        } else if (radius < 10) {
            radius = 10;
        }

        const mapComponent = (
            <Map center={position} zoom={15} className="map-small" zoomControl={false}>
                <TileLayer attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url=" https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}@2x.png"/>
                <Circle
                    center={userPosition}
                    radius={radius}
                    stroke={false}
                    fillOpacity={0.4} />
                <Circle center={userPosition} radius={5} stroke={false} fillOpacity={1} />
                <Marker position={position} key={station.stationId} />
            </Map>
        )

        return (
            <div>
                <BikesAppBar />
                <BikeStationDetails station={station} mapComponent={mapComponent} />
            </div>
        )
    }
}

export default withRouter(StationDetails)