var Sequelize = require('sequelize');
var flickrImage = require(__dirname + '/placeModel.js');
var User = require(__dirname + '/../users/userModel.js');
var FLICKR_API_KEY = require(__dirname + '/../config/flickr.js');
var request = require('request');
var urlParser = require('url');

module.exports.searchFlickr = function(req, res) {
  //search coordinates or string
  var queryString = urlParser.parse(req.url).search;
  var queryCoord = urlParser.parse(req.url).coord;
  var method ='flickr.photos.search';
  // https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e473927df4ee4e286fe09119cadfd471

  request.get('https://api.flickr.com/services/rest/?method=' + method +'&text=' + queryString +  '&api_key=' + FLICKR_API_KEY.KEY)
}
