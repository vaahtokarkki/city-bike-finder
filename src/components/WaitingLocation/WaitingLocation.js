import React from "react";
import GeolocationStore from "../../stores/GeolocationStore";

import LocationOn from "@material-ui/icons/LocationOn";

export const WaitingLocation = props => {
  const geolocation = GeolocationStore.getLocation();
  if (geolocation === null || !geolocation.userDennied) {
    return (
      <div>
        <h1 className="waiting-location">Odotetaan sijaintia</h1>
        <LocationOn className="waiting-location-icon" />
      </div>
    );
  }

  return (
    <h1 className="error-message">
      Sovellus tarvitsee luvan sijaintiisi lähimmän pyöräaseman löytämiseksi.<br />
      Salli sijainin käyttö selaimesta ja päivitä sivu.
    </h1>
  );
};

export default WaitingLocation;
