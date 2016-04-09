// This is the Main Controller for serving index file and
// doing other work related to the entire application.

// Implement once database is integrated
// var views = require('../models/views.js');

exports.default = function(req, res) {
  res.sendfile('./client/index.html');
};

exports.getAll = function(req, res) {
  // until we implement this endpoint, just default to serving the index file
  res.sendfile('./client/index.html');  
};



var seedDatabase = function(data) {
  View.create(data, function(err, newView){
    if (err) {
      return console.log(err);
    }
    console.log(newView);
    // res.json(newCharacters);
  })
};

//seedDatabase('');
