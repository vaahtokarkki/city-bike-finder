import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sortBikeStations from "./SortBikeStations";

configure({ adapter: new Adapter() });

describe("Sort bike stations", () => {
  //Used to test correct order
  const shuffleArray = arr => {
    return arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  };

  const testStations = [
    { name: "Test station 1", lat: 60.001, lon: 25.001 },
    { name: "Test station 2", lat: 60.01, lon: 25.01 },
    { name: "Test station 3", lat: 60.1, lon: 25.1 }
  ];
  const testLocation = { lat: 60.0, lon: 25.0 };

  it("Always return correct amount of stations", () => {
    const resultsAmount = 2;
    const sorted = sortBikeStations(
      testStations,
      resultsAmount,
      testLocation.lat,
      testLocation.lon
    );
    expect(sorted.length).toBe(resultsAmount);
  });

  it("Order is correct, station 1", () => {
    const suffledStations = shuffleArray(testStations);
    const sorted = sortBikeStations(
      suffledStations,
      testStations.length,
      testLocation.lat,
      testLocation.lon
    );
    expect(sorted[0].station.name).toBe("Test station 1");
  });

  it("Order is correct, station 2", () => {
    const suffledStations = shuffleArray(testStations);
    const sorted = sortBikeStations(
      suffledStations,
      testStations.length,
      testLocation.lat,
      testLocation.lon
    );
    expect(sorted[1].station.name).toBe("Test station 2");
  });

  it("Order is correct, station 3", () => {
    const suffledStations = shuffleArray(testStations);
    const sorted = sortBikeStations(
      suffledStations,
      testStations.length,
      testLocation.lat,
      testLocation.lon
    );
    expect(sorted[2].station.name).toBe("Test station 3");
  });
});
