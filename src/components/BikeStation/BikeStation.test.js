import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BikeStation from "./BikeStation";

configure({ adapter: new Adapter() });

describe("BikeStation", () => {
  let props;
  let mountedBikeStation;
  const bikeStation = () => {
    if (!mountedBikeStation) {
      mountedBikeStation = mount(<BikeStation {...props} />);
    }
    return mountedBikeStation;
  };

  beforeEach(() => {
    props = {
      name: undefined,
      bikesAvailable: undefined,
      distance: undefined,
      listNumber: undefined
    };
    mountedBikeStation = undefined;
  });

  console.log(bikeStation());

  // All tests will go here

  it("always renders ListItem", () => {
    const items = bikeStation().find("ListItem");
    expect(items.length).toBeGreaterThan(0);
  });


  it("contains everything else that gets rendered", () => {
    const li = bikeStation().find("ListItem");
    const wrappingLi = li.first();
    
    expect(wrappingLi.children()).toEqual(bikeStation().find("ListItem").children());
  });

  describe("when props passed", () => {
    beforeEach(() => {
      props = {
        name: "Test staion",
        bikesAvailable: 25,
        distance: 500,
        listNumber: 1
      };
    });

    it("renders staion name", () => {
      const typo = bikeStation().find("Typography");
      expect(typo.first().text()).toBe("Test staion");
    })

    it("renders bikes left and distance", () => {
      const p = bikeStation().find("p");
      expect(p.text()).toMatch("Pyöriä jäljellä: 25Etäisyys: 500 metriä");
    });

    it("renders station number correctly", () => {
      const avatar = bikeStation().find("Avatar");
      expect(avatar.first().text()).toBe("1");
    })

  })
});
