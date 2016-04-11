var Sequelize = require('sequelize');
var db = require(__dirname + '/../db/index.js');

var Place = db.define('Place',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    googlePlaceId: {
      type: Sequelize.STRING,
      field: 'google_place_id'
    },
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);


// this is an example of how to add a new Place
// to be used in apiController eventually
Place.sync({force: true}).then(function () {
  // Table created
});

module.exports = Place;