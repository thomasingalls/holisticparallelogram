import * as types from '../constants/ActionTypes.js';

const initialState = [];

// var color = 'red';
// switch(color){  
//   case 'red':         
//     console.log("Red's a cool color!");       
//     break;        
//   case 'blue':          
//     console.log("Blue's good too");       
//     break;        
//   default:          
//     console.log("Please choose red or blue");       
//     break;        
// }


export default function places (state = initialState, action) {
  console.log('Action: ', action);
  console.log('State: ', state);

  switch (action.type) {
    case types.SAVE_PLACE:
      for (var i = 0; i < state.length; i++) {
        if (state[i].googlePlaceId === action.place.googlePlaceId) {
          return state;
        }
      }
      return state.concat(action.place);
    case types.DELETE_PLACE:
      // return Object.assign({}, state, {
      //   places: state.savedPlaces.filter((placeId) => { //not sure if this works
      //     return place.googlePlaceId !== action.savedPlace.googlePlaceId;
      //   })
      // })
      var newState = state.slice();
      for (var i = 0; i < newState.length; i++) {
        if (newState[i].googlePlaceId === action.placeId) {
          newState.splice(i, 1);
        }
      }
      console.log(newState);
      return newState;
    default:
      return state;
  }
}
