import * as types from '../constants/ActionTypes.js';

export var updateViews = function(location) {
  return { type: types.UPDATE_VIEWS, location };
};
