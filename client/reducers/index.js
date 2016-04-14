import { combineReducers } from 'redux';
import places from './places.js';
import savedPlaces from './savedPlaces.js';
import user from './user.js';

const rootReducer = combineReducers({
  places,
  savedPlaces,
  user
});

export default rootReducer;
