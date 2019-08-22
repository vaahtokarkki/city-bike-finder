import React from "react";
import { List } from "@material-ui/core";
import { BikeStation } from "../../components/BikeStation/BikeStation";
import { withRouter } from "react-router";

const BikeStationList =  ({stations}) => {
  if(stations === undefined || stations.length === 0) {
    return <h1>Sopivia asemia ei löytynyt!</h1>
  }

  return (
    <List>
      {stations.map((s, index) => (
        <BikeStation
          name={s.station.name}
          lat={s.station.lat}
          lon={s.station.lon}
          bikesAvailable={s.station.bikesAvailable}
          distance={Math.round(s.distance)}
          listNumber={index + 1}
          key={index}
        />
      ))}
    </List>
  )

}

export default withRouter(BikeStationList);
