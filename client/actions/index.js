import * as types from '../constants/ActionTypes.js';

var updateZip = function(code) {
  return { type: types.UPDATE_ZIP, code };
};

module.exports = updateZip;
