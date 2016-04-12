var path = require('path');
var googleKeys = require(__dirname + '/../config/googleplus.js')

var placeController = require(__dirname + '/../places/placeController.js');
var userController = require(__dirname + '/../users/userController.js');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var checkAuth = function (req, res, next) {
  console.log('CHECK AUTH');
  console.log(req.session);
  if (req.session.passport ? req.session.passport.user : false) {
    next();
  } else {
    req.session.error = 'Bad credentials.';
    res.redirect('/auth/login');
  }
  // res.send('hello');
};

module.exports = function(app, express) {

  app.use(express.static(__dirname + '/../../client'));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy({
    clientID: googleKeys.CLIENT_ID,
    clientSecret: googleKeys.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, function(accessToken, refreshToken, profile, done) {
    // Create a user if it is a new user,
    return done(null, profile);

      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
  }));


  app.get('/api/places', placeController.searchGoogle);

  app.post('/api/places/saved', checkAuth, placeController.saveOne);
  app.get('/api/places/saved', checkAuth, placeController.getAll);

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
