import geodist from 'geodist'

export function sortBikeStations(stations, userLat, userLon) {
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

export default sortBikeStations;