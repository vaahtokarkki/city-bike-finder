import Dispatcher from "../Dispatcher";
import ActionTypes from "../Constants";

class BikeStationActions {
 
    addStations(stations) {
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_STATIONS,
            payload: stations 
        });
    }

    addOne(station) {
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_ONE,
            payload: station
        });
    }

    startTracking(intervalObject) {
        Dispatcher.dispatch({
            actionType: ActionTypes.START_TRACKING,
            payload: intervalObject
        });
    }

    stopTracking() {
        Dispatcher.dispatch({
            actionType: ActionTypes.STOP_TRACKING,
            payload: null
        });
    }
 
}
 
export default new BikeStationActions();