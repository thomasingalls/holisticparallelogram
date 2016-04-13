var path = require('path');
var googleKeys = require(__dirname + '/../config/googleplus.js')

var placeController = require(__dirname + '/../places/placeController.js');
var userController = require(__dirname + '/../users/userController.js');

var User = require(__dirname + '/../users/userModel.js');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var checkAuth = function (req, res, next) {
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
    // Create a user if it is a new user
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

  app.get('/', function(req, res) {
    if (!req.session.passport) { // user is not logged in
      res.render('index');
    } else {
      res.render('index',
        { firstName: req.session.passport.user.name.givenName || '',
          lastName: req.session.passport.user.name.familyName || '',
          avatarUrl: req.session.passport.user.photos[0].value || null,
        });
    }
  });

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
