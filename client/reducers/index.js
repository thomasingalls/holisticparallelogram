import { combineReducers } from 'redux';
import places from './places.js';
import savedPlaces from './savedPlaces.js';
import user from './user.js';
import coordinate from './coordinate.js';

const rootReducer = combineReducers({
  places,
  savedPlaces,
  user, 
  coordinate
});

export default rootReducer;
