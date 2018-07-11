import Dispatcher from "../Dispatcher";
import ActionTypes from "../Constants";

class GeolocationActions {
 
    updateLocation(item) {
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_LOCATION,
            payload: item 
        });
    }
 
}
 
export default new GeolocationActions();