var Sequelize = require('sequelize');

var db = new Sequelize('scenic', 'root', '', {
  define: {
    timestamps: false // true by default
  }
});

module.exports = db;