import React from "react";
import PropTypes from "prop-types";

import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import {getDistanceToCurrent} from '../../services/Geolocation'

import './BikeStationDetails.css'

export const BikeStationDetails = ({station, mapComponent}) => {

    const distance = getDistanceToCurrent(station.lat, station.lon)
    const bikesAvailable = station.bikesAvailable === 0 ? '0' :  station.bikesAvailable
    return(
        <div className="station-details-wrapper">
            <CardHeader
                avatar={
                    <Avatar aria-label="Recipe" className="station-avatar">
                    {bikesAvailable}
                    </Avatar>
                }
                title={station.name}
                subheader={`Etäisyys ${distance} metriä`} />

            {mapComponent}

            <CardContent>
                <Typography component="p" className="station-detail-text">
                    Asemalla vapaita pyöriä {station.bikesAvailable} kappaletta
                </Typography>
            </CardContent>
        </div>
    )

}

BikeStationDetails.propTypes = {
    station: PropTypes.object.isRequired,
    mapComponent: PropTypes.object.isRequired
}

export default BikeStationDetails;