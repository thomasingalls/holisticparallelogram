import * as types from '../constants/ActionTypes.js';

module.exports = {

  updateViews: function(location) {
    return { type: types.UPDATE_VIEWS, location };
  }

};
