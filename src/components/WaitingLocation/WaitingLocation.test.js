import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WaitingLocation from "./WaitingLocation";

configure({ adapter: new Adapter() });

describe("WaitingLocation", () => {
  let props;
  let mountedWaitingLocation;
  const waitingLocation = () => {
    if (!mountedWaitingLocation) {
      mountedWaitingLocation = mount(<WaitingLocation {...props} />);
    }
    return mountedWaitingLocation;
  };

  beforeEach(() => {
    (props = {
      userDennied: false
    }),
      (mountedWaitingLocation = undefined);
  });

  it("always renders component", () => {
    const wrapper = waitingLocation();
    expect(wrapper.find("div").length).toBeGreaterThan(0);
  });

  it("renders correct text when no props", () => {
    const h1 = waitingLocation().find("h1");
    expect(h1.hasClass("waiting-location")).toBe(true);
  });

  it("renders icon when no props", () => {
    const wrapper = waitingLocation();
    const icon = wrapper.find("LocationOn");
    expect(icon.length).toBeGreaterThan(0);
  });
  /*

  describe("Renders correct when passed props", () => {
    beforeEach(() => {
      props = {
        userDennied: true
      };
    });

    it("renders correct message", () => {
      const h1 = waitingLocation().find("h1");
      expect(h1.hasClass("error-message")).toBe(true);
    });
  });
  */
});
