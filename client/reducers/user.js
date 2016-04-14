import * as types from '../constants/ActionTypes.js';

const initialState = {
  firstName: null,
  lastName: null,
  avatarUrl: null
};

export default function user (state = initialState, action) {
  switch (action.type) {
  case types.LOGOUT:
    // Update the user state as empty.
    return state;
  default:
    return state;
  }
}
