import path from 'path';
import googleKeys from '../config/googleplus.js';
import placeController from '../places/placeController.js';
import userController from '../users/userController.js';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../client/reducers/index';
import App from '../../client/components/App';
import renderFullPage from '../views/index';

import User from '../users/userModel';

/*
serializeUser and deserializeUser are two required Passport methods that are
called when using sessions with Passport.

http://toon.io/understanding-passportjs-authentication-flow/
*/

// Determines what user data should be stored in the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Determines what user data should be retrieved from the session
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Middleware for checking whether the user is logged in
var checkAuth = function (req, res, next) {
  if (req.session.passport ? req.session.passport.user : false) {
    next();
  } else {
    req.session.error = 'Bad credentials.';
    res.redirect('/auth/login');
  }
};

// Handler for rendering the index page with user data, if available
// http://redux.js.org/docs/recipes/ServerRendering.html
var renderIndex = function(req, res) {
  // Initialize user state if user is logged in
  var user = {};
  if (req.session.passport && req.session.passport.user) {
    user = {
      googleId: req.session.passport.user.id,
      firstName: req.session.passport.user.name.givenName || null,
      lastName: req.session.passport.user.name.familyName || null,
      avatarUrl: req.session.passport.user.photos[0].value || null,
    }
  }

  // Create a new Redux store instance
  const store = createStore(rootReducer, {
    places: [],
    savedPlaces: [],
    user: user
  });

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
    <App />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const initialState = store.getState();

  // Send the rendered page back to the client as a String
  res.send(renderFullPage(html, initialState));
}


module.exports = function(app, express) {
  app.use(express.static(__dirname + '/../../client'));


  // http://passportjs.org/docs/google
  app.use(passport.initialize());

  // This must be declared after the Express session is declared since passport
  // sessions piggyback off of Express sessions
  app.use(passport.session());

  passport.use(new GoogleStrategy.OAuth2Strategy({
    clientID: googleKeys.CLIENT_ID,
    clientSecret: googleKeys.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, function(accessToken, refreshToken, profile, done) {
    // Create a user if it is a new user, otherwise just get the user from the DB
    User
      .findOrCreate({
        where: {
          googleUserId: profile.id
        },
        defaults: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        }
      })
      // Spread is used for functions that return multiple success values
      // e.g. findOrCreate returns a user and a boolean wasCreated
      .spread(function(user, created) {
        console.log('User data returned from User.findOrCreate: ', user.get({
          plain: true
        }));
        console.log('New User Created? (t/f): ', created);
        // Below is an example of what comes back to spread from findOrCreate
        // (see above console.logs), assumes that user didn't exist already
        /*{
           firstName: 'Lack',
           lastName: 'Zester',
           id: 411911551212,
         }
         created: true*/
      });
    return done(null, profile);
  }));

  app.get('/', renderIndex);

  app.get('/api/places', placeController.searchGoogle);
  app.post('/api/places/saved', placeController.saveOne);
  app.get('/api/places/saved', checkAuth, placeController.getAllSaved);
  app.get('/api/places/deleted', checkAuth, placeController.deleteOnePlace);

  app.post('/api/users', userController.saveOne);

  app.get('/auth/login', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../client/login.html'));
  });

  app.get('/auth/logout', function(req, res) {
    req.session.destroy(function() {
      res.redirect('/auth/login');
    });
  });

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );
};
