var Sequelize = require('sequelize');
var Place = require(__dirname + '/placeModel.js');
var User = require(__dirname + '/../users/userModel.js');
var GOOGLE_PLACES_API_KEY = require(__dirname + '/../config/googleplaces.js');
var request = require('request');
var urlParser = require('url');


module.exports.getAllSaved = function(req, res) {
  var user = req.body.user;
  return User.findOne({where: user})
    .then(function(foundUser) {
      return foundUser.getPlaces();
    })
    .then(function(foundPlaces) {
      res.json(foundPlaces);
    });
  // User.findOne(user, function(foundUser) {
  //   foundUser.getPlaces(function(foundPlaces) {
  //     res.json(foundPlaces);
  //   });
  // });
};

module.exports.saveOne = function(req, res) {
  var user = req.body.user;
  var place = req.body.place;
  return User.findOne({where: user})
    .then(function(foundUser) {
      return foundUser.addPlace(place);
    })
    .then(function(createdPlace) {
      res.json(createdPlace);
    });
  // User.findOne(user, function(foundUser) {
  //   foundUser.addPlace(place, function(createdPlace) {
  //     res.json(createdPlace);
  //   });
  // });
};

module.exports.searchGoogle = function(req, res) {

  var searchString = urlParser.parse(req.url).search; //include leading question mark
  var regex1 = new RegExp(/(good|great|awesome|fantastic|terrific|nice|cool|wonderful|dope|beautiful|amazing|gorgeous|breathtaking|scenic|panoramic|stunning) view/);
  var regex2 = new RegExp(/view (is|was) (good|great|awesome|fantastic|terrific|nice|cool|wonderful|dope|beautiful|amazing|gorgeous|breathtaking|scenic|panoramic|stunning)/);

  request.get('https://maps.googleapis.com/maps/api/place/radarsearch/json' + searchString + '&key=' + GOOGLE_PLACES_API_KEY)
    .on('response', function(response) { //layer 1 on 'response'

      var body = [];

      response.on('data', function(chunk) { //layer 2 on 'data'
        body.push(chunk);
      }).on('end', function() { //layer 2 on 'end'
        body = JSON.parse(Buffer.concat(body).toString());
        var filteredBody = {};
        filteredBody.places = [];
        if (body.results && body.results.length > 0) {

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
                      if (review.text.match(regex1) || review.text.match(regex2)) { //TODO: improve regex matching
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
          
        } else {
          res.json(filteredBody);
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

