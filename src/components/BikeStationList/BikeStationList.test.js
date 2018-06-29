import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BikeStationList from "./BikeStationList";

configure({ adapter: new Adapter() });

describe("BikeStationList", () => {
  const arrayOfStations = [
    {
      distance: 25,
      station: {
        name: "Test station",
        lat: 25.00000,
        lon: 60.00000,
        bikesAvailable: 5
      }
    },
    {
      distance: 50,
      station: {
        name: "Test station 2",
        lat: 25.10000,
        lon: 60.20000,
        bikesAvailable: 1
      }
    },
    {
      distance: 100,
      station: {
        name: "Test station",
        lat: 25.20000,
        lon: 60.20000,
        bikesAvailable: 0
      }
    }
  ];

  let props;
  let mountedBikeStationList;
  const bikeStationList = () => {
    if (!mountedBikeStationList) {
      mountedBikeStationList = mount(<BikeStationList {...props} />);
    }
    return mountedBikeStationList;
  };

  beforeEach(() => {
    (props = {
      stations: arrayOfStations
    }),
      (mountedBikeStationList = undefined);
  });

  it("renders always List component", () => {
    const list = bikeStationList().find("List");
    expect(list.length).toBeGreaterThan(0);
  });

  it("renders correct amount of stations", () => {
    const list = bikeStationList();
    const stations = list.find("List ListItem");
    expect(stations.length).toBe(arrayOfStations.length);
  })
});
