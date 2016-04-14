import { combineReducers } from 'redux';
import places from './places.js';
import savedPlaces from './savedPlaces.js';

const rootReducer = combineReducers({
  places,
  savedPlaces
});

export default rootReducer;
