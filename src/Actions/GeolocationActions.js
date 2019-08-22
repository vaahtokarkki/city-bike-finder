import Dispatcher from "../Dispatcher";
import ActionTypes from "../Constants";

class GeolocationActions {
 
    updateLocation(item) {
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_LOCATION,
            payload: item 
        });
    }

    startLocationTracking(intervalId) {
        Dispatcher.dispatch({
            actionType: ActionTypes.START_TRACKING,
            payload: intervalId 
        });
    }
 
}
 
export default new GeolocationActions();