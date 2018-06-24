import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoadingStations from "./LoadingStations";

configure({ adapter: new Adapter() });

describe("Loading stations", () => {
  let props;
  let mountedLoadingStations;
  const loadingStations = () => {
    if (!mountedLoadingStations) {
      mountedLoadingStations = mount(<LoadingStations {...props} />);
    }
    return mountedLoadingStations;
  };

  beforeEach(() => {
    props = undefined;
    mountedLoadingStations = undefined;
  });

  it("always renders component", () => {
    const wrapper = loadingStations();
    expect(wrapper.find(".loading-stations-wrapper").length).toBeGreaterThan(0);
  });

  it("always renders Header component", () => {
    const wrapper = loadingStations();
    const header = wrapper.find(".loading-stations-wrapper .header-container");
    expect(header.length).toBeGreaterThan(0);
  });
  
  it("always renders LoadingAPI component", () => {
    const wrapper = loadingStations();
    const loadingText = wrapper.find(".loading-stations-wrapper .loading-stations-text");
    expect(loadingText.length).toBeGreaterThan(0);
  });
});
