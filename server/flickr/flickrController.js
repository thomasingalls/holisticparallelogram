var Sequelize = require('sequelize');
var flickrImage = require(__dirname + '/placeModel.js');
var User = require(__dirname + '/../users/userModel.js');
var FLICKR_API_KEY = require(__dirname + '/../config/flickr.js');
var request = require('request');
var urlParser = require('url');

module.exports.searchFlickr = function(req, res) {
  //search coordinates or string
  var queryString = urlParser.parse(req.url).search;
  var lon = urlParser.parse(req.url).lon;
  var lat = urlParser.parse(req.url).lat;
  var radius = 1;
  var accuracy = 11
  var method ='flickr.photos.search';
  var sort = 'relevance'
  //The possible values are: date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, interestingness-asc, and relevance.

  request.get('https://api.flickr.com/services/rest/?method=' + method +'&text=' + queryString + '&accuracy=' + accuracy +'&lat=' + lat + '&lon=' + lon + '&radius=' + radius + '&sort=' + sort + '&api_key=' + FLICKR_API_KEY.KEY)
}

module.exports.getPhotoURl = function(photoID, size) {  //return image source
  request.get('https;//api.flickr.com/services/rest/?method=flickr.photos.getSizes&photo_id=' + photoID + '&api_key=' + FLICKR_API_KEY.KEY)
          .on('response', function(response) {
            var body = [];
            response.on('data', function(chunk) {
              body.push(chunk);
            }).on ('end', function() { //select the right image and return the data
              //go through the entire list
              //select the right size
              return body.something[index].source;
            })
          })
}
