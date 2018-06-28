import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import InfoDialog from "./InfoDialog";

configure({ adapter: new Adapter() });

describe("InfoDialog", () => {
  let props;
  let mountedInfoDialog;
  const infoDialog = () => {
    if (!mountedInfoDialog) {
      mountedInfoDialog = mount(<InfoDialog {...props} />);
    }
    return mountedInfoDialog;
  };

  beforeEach(() => {
    props = undefined;
    mountedInfoDialog = undefined;
  });

  it("closes on close button", () => {
    const dialog = infoDialog();
    dialog.setState({open:true});
    
    const closeButton = dialog.find(".close-button > button");
    closeButton.simulate("click");

    expect(dialog.state().open).toBe(false);
  });
});
