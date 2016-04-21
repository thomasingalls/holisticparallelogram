var Sequelize = require('sequelize');
var flickrImage = require(__dirname + '/../places/placeModel.js');
var User = require(__dirname + '/../users/userModel.js');
var FLICKR_API_KEY = require(__dirname + '/../config/flickr.js');
var request = require('request');
var urlParser = require('url');
var Flickr = require('flickrapi');
var rp = require('request-promise');

//Flickr.authenticate(FLICKR_API_KEY,function(error, ))

var getPhotoUrl = function(photoID, size, storage, googlePlacesObj, res) {  //return image source
  return rp.get('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&photo_id=' + photoID
      + '&api_key=' + FLICKR_API_KEY.api_key
      + '&format=json&nojsoncallback=1'
    )
    .then(function(data){
      var photoSizes = JSON.parse(data).sizes.size;
      for (var i = 0; i < photoSizes.length; i++) {
        if(photoSizes[i].label === size) {
          googlePlacesObj.url = photoSizes[i].source;
          storage.places.push(googlePlacesObj);
          return true;
        }
      }
    })
};

module.exports.search = function(googlePlacesObj, storage, res) {
  //The possible values are: date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, interestingness-asc, and relevance.
  return rp.get('https://api.flickr.com/services/rest/?method='+ 'flickr.photos.search'
      + '&text=' + googlePlacesObj.name     //Flickr Search String
      + '&accuracy=' + 11                   //Within City Area
      + '&lat=' + googlePlacesObj.latitude  //Latitude
      + '&lon=' + googlePlacesObj.longitude //Longtitude
      + '&radius=' + 1                      //1km Range
      + '&sort='+ 'relevance'               //Sorting by keywords, other choices (interesting)
      + '&api_key=' + FLICKR_API_KEY.api_key //API KEY
      + '&format=json&nojsoncallback=1'      //JSON SORTING
    )
    .then(function(data){
      var photos = JSON.parse(data).photos.photo;
      for (var i = 0; i < photos.length; i++) {
        if(photos[i].id) {
          return getPhotoUrl(photos[i].id, "Medium", storage, googlePlacesObj, res);
        }
      }
      return false;
    });
};


module.exports.searchFail = function(text, long, lat) {
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
