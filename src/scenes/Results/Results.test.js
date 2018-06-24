import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Results from "./Results";
import { HashRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Loading stations", () => {
  let props;
  let mountedResults;
  const results = () => {
    if (!mountedResults) {
      mountedResults = mount(
        <HashRouter>
          <Results {...props} />
        </HashRouter>
      );
    }
    return mountedResults;
  };

  beforeEach(() => {
    props = {
      stations: [
        {
          distance: 25,
          station: {
            name: "Test station",
            lat: 25.0,
            lon: 60.0,
            bikesAvailable: 5
          }
        },
        {
          distance: 50,
          station: {
            name: "Test station 2",
            lat: 25.1,
            lon: 60.2,
            bikesAvailable: 1
          }
        },
        {
          distance: 100,
          station: {
            name: "Test station",
            lat: 25.2,
            lon: 60.2,
            bikesAvailable: 0
          }
        }
      ]
    };
    mountedResults = undefined;
  });

  it("renders always wrapper div", () => {
    const component = results();
    const wrapper = component.find(".results-wrapper");
    expect(wrapper.length).toBeGreaterThan(0);
  });

  it("renders always AppBar div", () => {
    const component = results();
    const wrapper = component.find("AppBar");
    expect(wrapper.length).toBeGreaterThan(0);
  });
});
