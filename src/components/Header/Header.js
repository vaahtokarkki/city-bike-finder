import React from "react";

import "./Header.css";
import logo from "../../images/kaupunkipyora-logo.png";
import HelpIcon from "@material-ui/icons/Help";
import { IconButton } from "@material-ui/core";
import InfoDialog from "../InfoDialog/InfoDialog";

export const Header = props => {

  function handleShowDialog() {
    window.dialogComponent.handleOpen();
  }

  function headerSvg() {
    return (
      <div className="header-container">
        <InfoDialog
          ref={dialogComponent => {
            window.dialogComponent = dialogComponent;
          }}
        />
        <img src={logo} alt="Kaupunkipyörä logo" className="logo" />
        <IconButton
          className="help-iconbutton"
          onClick={() => handleShowDialog()}
        >
          <HelpIcon style={{ fontSize: 40 }} />
        </IconButton>
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1081.3 575.3"
          className="headerSvg"
        >
          <g id="XMLID_285_">
            <path
              id="XMLID_239_"
              className="st0"
              d="M1081.3,280.5C427.1,280.5,510.1,561,0,575.3V0l1081.3,0V280.5z"
            />
            <path
              id="XMLID_238_"
              className="st1"
              d="M1081.3,280.5c-654.2,0-589,200.3-1081.3,200.3V0l1081.3,0V280.5z"
            />
            <path
              id="XMLID_3_"
              className="st2"
              d="M1081.3,280.5c-745,0-566.9,111.2-1081.3,111.2V0l1081.3,0V280.5z"
            />
          </g>
        </svg>
      </div>
    );
  }

  return headerSvg();
};

export default Header;
