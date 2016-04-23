import * as types from '../constants/ActionTypes.js';

const initialState = [];

export default function places (state = initialState, action) {
  // console.log('Action: ', action);
  // console.log('State: ', state);

  switch (action.type) {
  case types.UPDATE_PLACES:
    return action.places;
  default:
    return state;
  }
}
