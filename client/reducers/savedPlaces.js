import * as types from '../constants/ActionTypes.js';

const initialState = [];

export default function places (state = initialState, action) {
  switch (action.type) {
  case types.SAVE_PLACE:
    for (var i = 0; i < state.length; i++) {
      if (state[i].googlePlaceId === action.place.googlePlaceId) {
        return state;
      }
    }
    return state.concat(action.place);
  case types.DELETE_PLACE:
    return Object.assign({}, state, {
      places: state.filter((place) => { //not sure if this works
        return place.googlePlaceId !== action.place.googlePlaceId;
      })
    })
  default:
    return state;
  }
}
