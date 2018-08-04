import React, { Component } from "react";
import BikeStationStore from "../../stores/BikeStationStore";
import { List } from "@material-ui/core";
import { BikeStation } from "../../components/BikeStation/BikeStation";
import { withRouter } from "react-router";

class BikeStationList extends Component {
  constructor() {
    super();
    this.state = {
      stationsObject: BikeStationStore.getAllItems()
    };
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({ items: BikeStationStore.getAllItems() });
  }

  componentWillMount() {
    BikeStationStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    BikeStationStore.removeChangeListener(this._onChange);
  }

  render() {
    if (this.state.stationsObject.stations === undefined || this.state.stationsObject.stations === 0) {
      this.props.history.push("/");
      return null;
    }

    const results = this.state.stationsObject.stations.slice(0, this.state.stationsObject.displayAmount);

    return (
      <List>
        {results.map((s, index) => (
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
    );
  }
}

export default withRouter(BikeStationList);
