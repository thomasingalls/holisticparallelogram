module.exports = function() {
  var Place = require(__dirname + '/../places/placeModel.js');
  var User = require(__dirname + '/../users/userModel.js');

  Place.belongsToMany(User, {through: 'UserPlace'});
  User.belongsToMany(Place, {through: 'UserPlace'});

  Place.sync(); //use {force: true} option to drop existing tables
  User.sync();
};
