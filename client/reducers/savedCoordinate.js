import * as types from '../constants/ActionTypes.js';

const initialState = [];

export default function savedCoordinate (state = initialState, action) {
  console.log('Action: ', action);
  console.log('State: ', state);

  switch (action.type) {
  case types.SAVE_COORDINATE:
    var newState = state.slice();
    newState.push(action.coord);
    return newState;
  default:
    return state;
  }
}
