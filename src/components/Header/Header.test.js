import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "./Header";

configure({ adapter: new Adapter() });

describe("Loading stations", () => {
  let props;
  let mountedHeader;
  const header = () => {
    if (!mountedHeader) {
      mountedHeader = mount(<Header {...props} />);
    }
    return mountedHeader;
  };

  beforeEach(() => {
    props = undefined;
    mountedHeader = undefined;
  });

  it("always renders component", () => {
    const component = header();
    console.log(component.debug());
    expect(component.find(".header-container").length).toBeGreaterThan(0);
  });

  it("rendered contents div conain everything else", () => {
    const component = header().find(".header-container");
    expect(component.length).toBe(header().children().length);
  });

  it("always renders help icon", () => {
    const component = header();
    expect(component.find(".help-iconbutton").length).toBeGreaterThan(0);
  });

  it("always renders swg header layout", () => {
    const component = header();
    expect(component.find(".headerSvg").length).toBeGreaterThan(0);
  });

  //TODO: Test modal
  
});
