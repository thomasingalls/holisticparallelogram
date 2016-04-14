import express from 'express'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import urlParser from 'url'
import morgan from 'morgan'
import session from 'express-session'

var app = express();
require(__dirname + '/server/db/index.js')();

var port = process.env.PORT || 4568;
var router = require(__dirname + '/server/router/routes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('viewFinder'));
app.use(session());
app.use(morgan('dev'));

router(app, express);

app.listen(port, function(err) {
  if (err) {
    return console.log('Listen error: ', err);
  }
  console.log('Holistic Parallelogram Listening on Port ' + port);
});


// TODO: check if below are useful for this project
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
//app.use(methodOverride('X-HTTP-Method-Override'));

// ============= Optional Mongoose/Mongo Setup ===========
/*
// Mongoose/Mongo setup. Uncomment if using Mongoose.
var mongoose = require('mongoose');
var dbUri = process.env.MONGOLAB_URI ||'mongodb://localhost/mvp';
mongoose.connect(dbUri, function(err, res) {
  if (err) {
    console.log('Mongo connection error: ', err);
  }
});
*/
