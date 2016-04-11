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

module.exports = function(app, express) {

  app.use(express.static(__dirname + '/../../client'));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy({
    consumerKey: googleKeys.CLIENT_ID,
    consumerSecret: googleKeys.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, function(token, tokenSecret, profile, done) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
  }));

  app.get('/login', function(req, res) {
    res.sendFile('login.html');
  });

  app.get('/api/places', placeController.searchGoogle);

  app.post('/api/places/saved', placeController.saveOne);
  app.get('/api/places/saved', placeController.getAll);

  app.post('/api/users', userController.saveOne);

  app.get('/auth/google',
    passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );
};
