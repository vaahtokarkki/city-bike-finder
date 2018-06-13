import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/Header";

import LocationOn from "@material-ui/icons/LocationOn";

import "./WaitingLocation.css";

export const WaitingLocation = props => {
  let message;

  if (props.userDennied !== null && props.userDennied) {
    message = (
      <h1 className="error-message">
        Sovellus tarvitsee luvan sijaintiisi lähimmän pyöräaseman löytämiseksi.<br />
        Salli sijainin käyttö selaimesta ja päivitä sivu.
      </h1>
    );
  } else {
    message = (
      <span>
        <h1 className="waiting-location">Odotetaan sijaintia</h1>
        <LocationOn className="waiting-location-icon" />
      </span>
    );
  }
  return (
    <div className="waiting-location-wrapper">
      <Header />
      {message}
    </div>
  );
};

WaitingLocation.propTypes = {
  userDennied: PropTypes.bool
};

export default WaitingLocation;
