import { combineReducers } from 'redux';
import places from './places.js';
import savedPlaces from './savedPlaces.js';
import user from './user.js';
import savedCoordinate from './savedCoordinate.js';

const rootReducer = combineReducers({
  places,
  savedPlaces,
  user, 
  savedCoordinate
});

export default rootReducer;
