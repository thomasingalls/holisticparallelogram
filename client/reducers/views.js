import * as types from '../constants/ActionTypes.js';
import searchGooglePlaces from '../utils/searchGooglePlaces.js';

const initialState = [{
  name: 'The Bridges Golf Club',
  address: '9000 S Gale Ridge Rd, San Ramon, CA 94582, United States'
}];

export default function views (state = initialState, action) {
  switch (action.type) {

  case types.UPDATE_VIEWS:
    searchGooglePlaces(function(data) {
      console.log(data);
      return state;
    });
  default:
    return state;
  }
}
