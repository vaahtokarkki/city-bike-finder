import { EventEmitter } from "events";
import Dispatcher from "../Dispatcher/index";
import ActionTypes from "../Constants/index";

const CHANGE = "CHANGE";
let _bikeStationsState = [];

class BikeStationStore extends EventEmitter {
  constructor() {
    super();

    // Registers action handler with the Dispatcher.
    Dispatcher.register(this._registerToActions.bind(this));
  }

  // Switches over the action's type when an action is dispatched.
  _registerToActions(action) {
    switch (action.actionType) {
      case ActionTypes.ADD_STATIONS:
        this._addNewItem(action.payload);
        break;

      default:
        return true;
    }
  }

  // Adds a new item to the list and emits a CHANGED event.
  _addNewItem(item) {
    item.id = _bikeStationsState.length;
    _bikeStationsState.push(item);
    this.emit(CHANGE);
  }

  // Returns the current store's state.
  getAllItems() {
    return _bikeStationsState[_bikeStationsState.length - 1];
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

export default new BikeStationStore();
