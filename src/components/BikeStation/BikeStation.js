import React from "react";
import PropTypes from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import "./BikeStation.css";

export const BikeStation = props => {
  return (
    <ListItem>
      <Avatar className="list-avatar">{props.listNumber}</Avatar>
      <ListItemText
        primary={props.name}
        secondary={
          <span>
            Pyöriä jäljellä: {props.bikesAvailable}
            <br />
            Etäisyys: {props.distance} metriä
          </span>
        }
      />
    </ListItem>
  );
};

BikeStation.propTypes = {
  name: PropTypes.string,
  lat: PropTypes.number,
  lon: PropTypes.number,
  bikesAvailable: PropTypes.number,
  distance: PropTypes.number,
  listNumber: PropTypes.number
};

export default BikeStation;
