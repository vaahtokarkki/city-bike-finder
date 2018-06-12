import React from "react";
import PropTypes from "prop-types";

export const WaitingLocation = props => {
  if (props.userDennied !== null && props.userDennied) {
    return (
      <h1>
        Sovellus tarvitsee luvan sijaintiisi lähimmän pyöräaseman löytämiseksi.
        Salli sijainin käyttö selaimesta ja päivitä sivu.
      </h1>
    );
  }

  return <h1>Odotetaan sijaintia</h1>;
};

WaitingLocation.propTypes = {
  userDennied: PropTypes.bool
};

export default WaitingLocation;
