import React from "react";
import PropTypes from "prop-types";
import { List } from "@material-ui/core";
import { BikeStation } from "../../components/BikeStation/BikeStation";

export const BikeStationList = props => {
  return (
    <List>
      {props.stations.map((s, index) => (
        <BikeStation
          name={s.station.name}
          lat={s.station.lat}
          lon={s.station.lon}
          bikesAvailable={s.station.bikesAvailable}
          distance={s.distance}
          listNumber={index + 1}
          key={index}
        />
      ))}
    </List>
  );
};

BikeStationList.propTypes = {
  stations: PropTypes.array
};

export default BikeStationList;
