import geodist from 'geodist'

export function sortBikeStations(stations, resultsAmount, userLat, userLon) {
    let withDistances = stations.map(obj => {
        const distance = geodist(
            {lat: userLat, lon: userLon},
            {lat: obj.lat, lon: obj.lon},
            {exact: true, unit: 'meters'}
        );
        return {distance: distance, station: obj}
    });

    withDistances.sort(function(a,b) {
        return a.distance - b.distance;
    });
    
    withDistances = withDistances.slice(0,resultsAmount);

    return withDistances;
}

export default sortBikeStations;