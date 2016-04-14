module.exports = function() {
  var Place = require(__dirname + '/../places/placeModel.js');
  var User = require(__dirname + '/../users/userModel.js');

  Place.belongsToMany(User, {through: 'UserPlace'});
  User.belongsToMany(Place, {through: 'UserPlace'});

  Place.sync({force: true}).then(function () {
    // Table created
  });

  User.sync({force: true}).then(function () { //drops table if exists
    // Table created
  });
};
