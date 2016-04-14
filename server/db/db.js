var Sequelize = require('sequelize');
var password = require('../config/mysqlsetup.js');

// Using ES2015:
// import password from '../config/mysqlsetup.js';

var db = new Sequelize('scenic', 'root', password, {
  define: {
    timestamps: false // true by default
  }
});

module.exports = db;