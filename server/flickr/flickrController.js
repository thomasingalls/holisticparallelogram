var Sequelize = require('sequelize');
var flickrImage = require(__dirname + '/../places/placeModel.js');
var User = require(__dirname + '/../users/userModel.js');
var FLICKR_API_KEY = require(__dirname + '/../config/flickr.js');
var request = require('request');
var urlParser = require('url');
var Flickr = require('flickrapi');

//Flickr.authenticate(FLICKR_API_KEY,function(error, ))

var getPhotoUrl = function(photoID, size, storage) {  //return image source
  request.get('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&photo_id=' + photoID + '&api_key=' + FLICKR_API_KEY.api_key + '&format=json&nojsoncallback=1')
    .on('response', function(response) {
      var body = [];
      response.on('data', function(chunk) {
        body.push(chunk);
      })
      .on ('end', function() { //select the right image and return the data
        body = JSON.parse(Buffer.concat(body).toString());
        var sizes = body.sizes.size;
        for (var i = 0; i < sizes.length; i++) {
          if(sizes[i].label === size) {
            console.log(sizes[i].source);
            break;
          };
        }
      });
    })
};

module.exports.searchFlickr = function(text, lon, lat, variable, storage) {
  console.log('search firing on -->', text);
  //search coordinates or string
  var queryString = text;
  var lon = lon;
  var lat = lat;
  var radius = 1;
  var accuracy = 11;
  var method ='flickr.photos.search';
  var sort = 'relevance';
  //The possible values are: date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, interestingness-asc, and relevance.
  request.get('https://api.flickr.com/services/rest/?method='
    + method +'&text=' + queryString + '&accuracy=' + accuracy
    +'&lat=' + lat + '&lon=' + lon + '&radius=' + radius + '&sort='
    + sort + '&api_key=' + FLICKR_API_KEY.api_key
    +'&format=json&nojsoncallback=1')
    .on('response', function(response) {
      var body = [];
      response.on('data', function(chunk){
        body.push(chunk);
      })
      .on('end', function() {
        body = JSON.parse(Buffer.concat(body).toString());
        var photos = body.photos.photo;
        for (var i = 0; i < photos.length; i++) {
          if (photos[i].id) {
            getPhotoUrl(photos[i].id, "Medium", storage);
            break;
          }
        }
      });
    });
};


module.exports.search = function(text, long, lat) {
  console.log('firing');
  Flickr.authenticate(FLICKR_API_KEY, function(error, flickr) {
    if (error) {
      console.log('authentication problem', err);
      return;
    }
    console.log('authenticated yaya');
    flickr.photos.search({
      api_key: FLICKR_API_KEY.key,
      text: text,
      lon: long,
      lat: lat,
      accuracy: 11,
      radius: 1,
      sort: 'relevance',
    }, function(err, data) {
      if(err) {
        console.log('query error', err);
        return;
      }
      console.log("THE BOOM BOOM DATA", data);
      return data;
    });
  });
};
