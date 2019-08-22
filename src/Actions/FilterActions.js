import Dispatcher from "../Dispatcher";
import ActionTypes from "../Constants";

class FilterActions {
 
    changeFilter(item) {
        Dispatcher.dispatch({
            actionType: ActionTypes.CHANGE_FILTER,
            payload: item 
        });
    }
 
}
 
export default new FilterActions();