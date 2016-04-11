
var placeController = require(__dirname + '/../places/placeController.js');
var userController = require(__dirname + '/../users/userController.js');

module.exports = function(app, express) {

  app.use(express.static(__dirname + '/../../client'));

  app.get('/api/places', placeController.searchGoogle);

  app.post('/api/places/saved', placeController.saveOne);
  app.get('/api/places/saved', placeController.getAll);

  app.post('/api/users', userController.saveOne);

};

