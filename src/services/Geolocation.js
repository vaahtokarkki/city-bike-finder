export function getGeolocation(callback) {
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log("user location OK");

      callback({
        location: position,
        userDennied: false
      });
      return;
    },
    error => {
      console.log(error);

      callback({
        location: null,
        userDennied: true
      });
      return;
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}

export default getGeolocation;
