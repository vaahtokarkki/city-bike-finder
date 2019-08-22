import geodist from 'geodist'

import GeolocationStore from "../stores/GeolocationStore"

export function sortBikeStations(stations) {
    const userLocation = GeolocationStore.getLocation()
    const userLat = userLocation.location.coords.latitude
    const userLon = userLocation.location.coords.longitude

    let withDistances = stations.map(obj => {
        let distance = geodist(
            {lat: userLat, lon: userLon},
            {lat: obj.lat, lon: obj.lon},
            {exact: true, unit: 'meters'}
        );
        distance = Math.round(distance);
        return {distance: distance, station: obj}
    });

    withDistances.sort(function(a,b) {
        return a.distance - b.distance;
    });
    

    return withDistances;
}

export function filterStations(stations, minBikesAvailable, results) {
    const parsed = stations.filter(({ station }) => station.state === "Station on")
    
    let filtered;
    if(minBikesAvailable < 1) {
      filtered = parsed.filter(({ station }) => station.bikesAvailable === 0);
    } else {
      filtered = parsed.filter(({ station }) => station.bikesAvailable >= minBikesAvailable);
    }
    
    if(results >= filtered.length) {
      return filtered;
    }

    return filtered.slice(0,results)
}

export default sortBikeStations;