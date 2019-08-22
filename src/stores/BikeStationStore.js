import { EventEmitter } from "events";
import Dispatcher from "../Dispatcher/index";
import ActionTypes from "../Constants/index";

const CHANGE = "CHANGE";
let _bikeStationsState = [];
let _bikesLoading = true;

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
        this._addAllStations(action.payload);
        break;
      case ActionTypes.ADD_ONE:
        this._addOneStation(action.payload)
        break;
      default:
        return true;
    }
  }

  // Adds a new item to the list and emits a CHANGED event.
  _addAllStations(stations) {
    _bikeStationsState = stations;
    _bikesLoading = false;
    this.emit(CHANGE);
  }

  _addOneStation(station) {
    const stationsOldRemoved = _bikeStationsState.filter(s => s.stationId === station.stationId)
    const updatedStations = stationsOldRemoved.concat(station)
    _bikeStationsState = updatedStations
    _bikesLoading = false;
    this.emit(CHANGE);
  }

  // Returns the current store's state.
  getAllItems() {
    return _bikeStationsState;
  }

  getOneStation(id) {
    return _bikeStationsState.filter(s => s.stationId === id)
  }

  isEmpty() {
    return _bikeStationsState.length === 0
  }

  isLoading() {
    return _bikesLoading
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
