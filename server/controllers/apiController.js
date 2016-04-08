// This is the API Controller for doing external api requests
// such as to Google Places API, and filtering the results to prepare
// formatted data for use on the client side.

var GOOGLE_PLACES_API_KEY = require(__dirname + '/../config/googleplaces.js');
var request = require('request');
var urlParser = require('url');
//TODO: require body-parser in server.js


//Make a get call to Google Places nearbysearch, get back 20 results;
//Make a get call to Google Places details for each of the 20 results, match their reviews against a regex, send filtered and simplified results back to client;
//Use a counter to make sure the results are only sent to client after all the initial results have been examined.
module.exports.getAll = function(req, res) { //only returns 20 results per call, needs to pass in pagetoken returned from previous call in order to get the next 20 results
  // var next_page_token;
  var searchString = urlParser.parse(req.url).search; //includes leading question mark
  var regex = new RegExp(/(good|great|awesome|fantastic|terrific|nice|cool|wonderful|dope|beautiful|amazing|gorgeous|breathtaking) view/, 'i');

  request.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json' + searchString + '&key=' + GOOGLE_PLACES_API_KEY)
    .on('response', function(response) {
      console.log(response.body.results);
      var filteredBody = {};
      filteredBody.places = [];
      //do the filtering here, 20 synchronous calls to get business details and filter for reviews
      var places = response.body.results;
      var counter = 0; //ensures server only sends back filteredBody if all places have been processed
      for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var placeid = place['place_id'];

        request.get('https://maps.googleapis.com/maps/api/place/details/json?' + 'key=' + GOOGLE_PLACES_API_KEY + '&placeid=' + placeid)
          .on('response', function(response) {
            var placeDetails = response.body.result;
            var reviews = placeDetails.reviews;
            for (var j = 0; j < reviews.length; j++) {
              var review = reviews[j];
              if (review.text.match(regex)) { //TODO: improve regex matching
                filteredBody.places.push({
                  name: placeDetails.name,
                  address: placeDetails['formatted_address']
                });
                break;
              }
            }
            counter++;
          })
          .on('error', function(error) {
            //TODO: handle error
            counter++;
          })

      if (counter === places.length) {
        res.json(filteredBody); //also needs to pass page token back to client for further requests
      }
    })
    .on('error', function(error) {
      //TODO: handle error
    });
};



