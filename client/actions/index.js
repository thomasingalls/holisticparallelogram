import * as types from '../constants/ActionTypes.js';

module.exports = {

  updatePlaces: function(location) {
    return { type: types.UPDATE_PLACES, location };
  }

};
