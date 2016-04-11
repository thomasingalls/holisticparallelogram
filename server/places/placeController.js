var Place = require(__dirname + '/placeModel.js');
var GOOGLE_PLACES_API_KEY = require(__dirname + '/../config/googleplaces.js');
var request = require('request');
var urlParser = require('url');


module.exports.getAll = function(req, res) {

};

module.exports.saveOne = function(req, res) {

};

module.exports.searchGoogle = function(req, res) { //only return 20 results per call, need to pass in pagetoken returned from previous call in order to get the next 20 results

  var searchString = urlParser.parse(req.url).search; //include leading question mark
  var regex = new RegExp(/(good|great|awesome|fantastic|terrific|nice|cool|wonderful|dope|beautiful|amazing|gorgeous|breathtaking) view/);

  request.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json' + searchString + '&key=' + GOOGLE_PLACES_API_KEY)
    .on('response', function(response) { //layer 1 on 'response'

      var body = [];

      response.on('data', function(chunk) { //layer 2 on 'data'
        body.push(chunk);
      }).on('end', function() { //layer 2 on 'end'
        body = JSON.parse(Buffer.concat(body).toString());
        var filteredBody = {};
        filteredBody['next_page_token'] = body['next_page_token']; //pass next_page_token back to client in case it needs to fetch the next 20 results
        filteredBody.places = [];
        var places = body.results;
        var counter = 0; //ensure server only sends back filteredBody if all places have been processed
        for (var i = 0; i < places.length; i++) {
          var place = places[i];
          var placeid = place['place_id'];

          request.get('https://maps.googleapis.com/maps/api/place/details/json?' + 'key=' + GOOGLE_PLACES_API_KEY + '&placeid=' + placeid)
            .on('response', function(response) { //layer 3 on 'response'
              var body = [];
              response.on('data', function(chunk) { //layer 4 on 'data'
                body.push(chunk);
              }).on('end', function() { //layer 4 on 'end'
                body = JSON.parse(Buffer.concat(body).toString());
                var placeDetails = body.result;
                var reviews = placeDetails.reviews;
                if (reviews) {
                  for (var j = 0; j < reviews.length; j++) {
                    var review = reviews[j];
                    if (review.text.match(regex)) { //TODO: improve regex matching
                      filteredBody.places.push({
                        name: placeDetails.name,
                        address: placeDetails['formatted_address'],
                        placeid: placeid
                      });
                      break;
                    }
                  }
                }
                counter++;
                if (counter === places.length) {
                  res.json(filteredBody); //also needs to pass page token back to client for further requests
                }
              }); //end of layer 4 on 'end'
            }) //end of layer 3 on 'response'
            .on('error', function(error) { //layer 3 on 'error'
              //TODO: handle error
              counter++;
              if (counter === places.length) {
                res.json(filteredBody); //also needs to pass page token back to client for further requests
              } 
            }) //end of layer 3 on 'error'
        }
      }); //end of layer 2 on 'end'
    }) //end of layer 1 on 'response'
    .on('error', function(error) { //layeon 'error'
      //TODO: handle error
    }); //end of layer 1 on 'error'
};

// var seedData = require(__dirname.slice(0, -19) + '/db/config.js');

// var seedDatabase = function(data) {
//   data.forEach(function(item) {
//     View.create(item, function(err, newView){
//       if (err) {
//         return console.log(err);
//       }
//       console.log(newView);
//       // res.json(newCharacters);
//     });
//   });
// };

// seedDatabase(seedData);

