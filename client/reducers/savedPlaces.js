import * as types from '../constants/ActionTypes.js';

const initialState = [];

// =====
// SEED DATA FOR TESTING
// =====
// const initialState = [
//   {
//     'name': 'Hack Reactor',
//     'address': '8, 944 Market St, San Francisco, CA 94102'
//   },
//   {
//     'name': 'Muir Woods National Monument',
//     'address': '1 Muir Woods Rd, Mill Valley, CA 94941'
//   },
//   {
//     'name': 'Mount Tamalpais State Park',
//     'address': '3801 Panoramic Hwy, Mill Valley, CA 94941'
//   }
// ];

export default function places (state = initialState, action) {
  switch (action.type) {

  case types.SAVE_PLACE:
    return state.concat(action.place);
  default:
    return state;
  }
}
