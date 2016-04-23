import * as types from '../constants/ActionTypes.js';

const initialState = [];

export default function coordinate (state = initialState, action) {
  // console.log('coordinate Action: ', action);
  // console.log('coordinate State: ', state);

  switch (action.type) {
  case types.SAVE_COORDINATE:
    var newState = state.slice();
    newState.push(action.coord);
    console.log('save coordinate: ', newState);
    return newState;
  case types.FETCH_COORDINATE:
    console.log('fetch coordinate: ', state);
    return state;
  default:
    return state;
  }
}
