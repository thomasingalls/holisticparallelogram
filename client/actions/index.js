import * as types from '../constants/ActionTypes.js';

module.exports = {

  updatePlaces: function(places) {
    return { type: types.UPDATE_PLACES, places };
  }

};
