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
  console.log(req.session);
  if (req.session.passport ? req.session.passport.user : false) {
    next();
  } else {
    req.session.error = 'Bad credentials.';
    res.redirect('/auth/login');
  }
};

module.exports = function(app, express) {

  app.use(express.static(__dirname + '/../../client'));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy({
    consumerKey: googleKeys.CLIENT_ID,
    consumerSecret: googleKeys.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, function(token, tokenSecret, profile, done) {
      // Create a user if it is a new user

      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
  }));

  app.get('/api/places', placeController.searchGoogle);

  app.post('/api/places/saved', checkAuth, placeController.saveOne);
  app.get('/api/places/saved', checkAuth, placeController.getAll);

  app.post('/api/users', userController.saveOne);

  app.get('/auth/login', function(req, res) {
    res.sendFile('login.html');
  });

  app.get('/auth/google',
    passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );
};
