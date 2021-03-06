import { EventEmitter } from "events";
import Dispatcher from "../Dispatcher/index";
import ActionTypes from "../Constants/index";

const CHANGE = "CHANGE";
let _geolocationState = null;
let _intervalObject = null;

class GeolocationStore extends EventEmitter {
  constructor() {
    super();

    // Registers action handler with the Dispatcher.
    Dispatcher.register(this._registerToActions.bind(this));
  }

  // Switches over the action's type when an action is dispatched.
  _registerToActions(action) {
    switch (action.actionType) {
      case ActionTypes.UPDATE_LOCATION:
        this._addNewItem(action.payload);
        break;

      default:
        return true;
    }
  }

  // Adds a new item to the list and emits a CHANGED event.
  _addNewItem(item) {
    _geolocationState = item;
    this.emit(CHANGE);
  }

  // Returns the current store's state.
  getLocation() {
    return _geolocationState;
  }

  // Hooks a React component's callback to the CHANGED event.
  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  // Removes the listener from the CHANGED event.
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }

  registerTracking(payload) {
    _intervalObject = payload;
  }

  unregisterTracking() {
    clearInterval(_intervalObject)
    _intervalObject = null
  }
}

export default new GeolocationStore();
