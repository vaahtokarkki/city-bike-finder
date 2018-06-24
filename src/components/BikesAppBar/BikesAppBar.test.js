import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BikesAppBar from "./BikesAppBar";
import { HashRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("BikesAppBar", () => {
  let props;
  let mountedBikesAppBar;
  const bikesAppBar = () => {
    if (!mountedBikesAppBar) {
      mountedBikesAppBar = mount(
        <HashRouter>
          <BikesAppBar {...props} />
        </HashRouter>
      );
    }
    return mountedBikesAppBar;
  };

  beforeEach(() => {
    props = undefined;
    mountedBikesAppBar = undefined;
  });

  it("renders always AppBar component", () => {
      const appbar = bikesAppBar();
      expect(appbar.find("AppBar").length).toBeGreaterThan(0);
  });

  it("renders always back icon", () => {
    const appbar = bikesAppBar();
    const icon = appbar.find("ArrowBack");
    expect(icon.length).toBeGreaterThan(0);
  });

  it("renders always app bar title", () => {
    const appbar = bikesAppBar();
    const title = appbar.find("Typography");
    expect(title.text().length).toBeGreaterThan(0);
  });

  it("Link gets always rendered", () => {
    const appbar = bikesAppBar();
    const link = appbar.find("Toolbar Link");
    expect(link.length).toBeGreaterThan(0);
  });
});
