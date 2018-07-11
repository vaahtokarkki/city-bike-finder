import GeolocationActions from "../Actions/GeolocationActions";

export function getGeolocation() {
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log("user location OK");
      const locationObject = {
        location: position,
        userDennied: false
      };

      GeolocationActions.updateLocation(locationObject);
    },
    error => {
      console.log(error);

      const locationObject = {
        location: null,
        userDennied: true
      };

      GeolocationActions.updateLocation(locationObject);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}

export default getGeolocation;
