import { EventEmitter } from "events";
import Dispatcher from "../Dispatcher/index";
import ActionTypes from "../Constants/index";

const CHANGE = "CHANGE";
let _filterState = {
    minBikesAvailable: 1,
    results: 10
};

class FilterStore extends EventEmitter {
  constructor() {
    super();

    // Registers action handler with the Dispatcher.
    Dispatcher.register(this._registerToActions.bind(this));
  }

  // Switches over the action's type when an action is dispatched.
  _registerToActions(action) {
    switch (action.actionType) {
      case ActionTypes.CHANGE_FILTER:
        this._changeFilter(action.payload);
        break;
      default:
        return true;
    }
  }

  // Adds a new item to the list and emits a CHANGED event.
  _changeFilter(item) {
    _filterState = item
    this.emit(CHANGE);
  }

  // Returns the current store's state.
  getFilter() {
    return _filterState;
  }

  // Hooks a React component's callback to the CHANGED event.
  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  // Removes the listener from the CHANGED event.
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }
}

export default new FilterStore();
