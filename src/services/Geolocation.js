import geodist from 'geodist'

import GeolocationActions from "../Actions/GeolocationActions";
import GeolocationStore from "../stores/GeolocationStore";

export function getGeolocation() {
  navigator.geolocation.getCurrentPosition(
    position => {
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

export function startLocationTracking() {
  getGeolocation() // To get loaction before first interval
  const trackingInterval = setInterval(() => {
    getGeolocation()
  }, 5000);
  GeolocationActions.startLocationTracking(trackingInterval) 
}

export function getDistanceToCurrent(lat,lon) {
  const userLocation = GeolocationStore.getLocation()

  if(!userLocation)
    return null

  const userLat = userLocation.location.coords.latitude
  const userLon = userLocation.location.coords.longitude

  const distance = geodist(
    {lat: lat, lon: lon},
    {lat: userLat, lon: userLon},    
    {exact: true, unit: 'meters'}
  )

  return Math.round(distance)
}
