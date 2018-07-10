import Dispatcher from "../Dispatcher";
import ActionTypes from "../Constants";

class BikeStationActions {
 
    addStations(item) {
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_STATIONS,
            payload: item 
        });
    }
 
}
 
export default new BikeStationActions();