import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "./Header";

configure({ adapter: new Adapter() });

describe("Header", () => {
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

  it("always renders modal component", () => {
    const headerComponent = header();
    const modalComponent = headerComponent.find("InfoDialog");
    expect(modalComponent.children().length).toBeGreaterThan(0);
  });

  it("opens modal on click", () => {
    const headerComponent = header();

    const openModalButton = headerComponent.find(".help-iconbutton>button");
    openModalButton.simulate("click");

    const modalComponent = headerComponent.find("Dialog");
    expect(modalComponent.props().open).toBe(true);
  });
});
