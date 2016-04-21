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

  switch (action.type) {
    // case types.SAVE_PLACE:
    //   for (var i = 0; i < state.length; i++) {
    //     if (state[i].googlePlaceId === action.place.googlePlaceId) {
    //       return state;
    //     }
    //   }
    //   return state.concat(action.place);
    case types.DELETE_PLACE:
      console.log('helllloooooooooo');
      // console.log(action);
      // // console.log(state.savedPlaces);
      // return Object.assign({}, state, {
      //   places: state.savedPlaces.filter((placeId) => { //not sure if this works
      //     return place.googlePlaceId !== action.savedPlace.googlePlaceId;
      //   })
      // })
      break;
    default:
      return state;
  }
}
