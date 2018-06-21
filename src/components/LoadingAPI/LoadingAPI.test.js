import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoadingAPI from "./LoadingAPI";

configure({ adapter: new Adapter() });

describe("Loading stations", () => {
  let props;
  let mountedLoadingAPI;
  const loadingAPI = () => {
    if (!mountedLoadingAPI) {
      mountedLoadingAPI = mount(<LoadingAPI {...props} />);
    }
    return mountedLoadingAPI;
  };

  beforeEach(() => {
    props = undefined;
    mountedLoadingAPI = undefined;
  });

  it("always renders component", () => {
    const wrapper = loadingAPI();
    expect(wrapper.find("div").length).toBeGreaterThan(0);
  });
  
  it("always renders icon", () => {
    const wrapper = loadingAPI();
    const icon = wrapper.find(".loading-icon");
    expect(icon.length).toBeGreaterThan(0);
  })
});
