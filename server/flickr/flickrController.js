var Sequelize = require('sequelize');
var flickrImage = require(__dirname + '/placeModel.js');
var User = require(__dirname + '/../users/userModel.js');
var FLICKR_API_KEY = require(__dirname + '/../config/flickrAPI.js');
var request = require('request');
var urlParser = require('url');

module.exports.searchFlickr = function(req, res) {
  //search coordinates or string
  var queryString = urlParser.parse(req.url).search;
  var queryCoord = urlParser.parse(req.url).coord;

  request.get('')
}
