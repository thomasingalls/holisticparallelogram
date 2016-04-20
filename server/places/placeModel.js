var Sequelize = require('sequelize');
var db = require(__dirname + '/../db/db.js');

var Place = db.define('Place',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    googlePlaceId: {
      type: Sequelize.STRING,
      field: 'google_place_id'
    },
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    image: {
      //we need to implement images
      type: Sequelize.STRING
    },
    longitude: {
      type: Sequelize.INTEGER
    },
    latitude: {
      type: Sequelize.INTEGER
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);

module.exports = Place;