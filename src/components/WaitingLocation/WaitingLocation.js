import React from "react";
import PropTypes from "prop-types";

import LocationOn from "@material-ui/icons/LocationOn";

export const WaitingLocation = props => {
  if (props.userDennied) {
    return (
      <h1 className="error-message">
        Sovellus tarvitsee luvan sijaintiisi lähimmän pyöräaseman löytämiseksi.<br />
        Salli sijainin käyttö selaimesta ja päivitä sivu.
      </h1>
    );
  }

  return (
    <div>
      <h1 className="waiting-location">Odotetaan sijaintia</h1>
      <LocationOn className="waiting-location-icon" />
    </div>
  );
};

WaitingLocation.propTypes = {
  userDennied: PropTypes.bool.isRequired
};

export default WaitingLocation;
