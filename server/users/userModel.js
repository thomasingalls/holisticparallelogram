var Sequelize = require('sequelize');
var db = require(__dirname + '/../db/index.js');

var User = db.define('User',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    googleUserId: {
      type: Sequelize.STRING,
      field: 'google_user_id'
    },
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
      type: Sequelize.STRING,
      field: 'last_name'
    }
  }, 
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);

User.sync({force: true}).then(function () { //drops table if exists
  // Table created
});

module.exports = User;