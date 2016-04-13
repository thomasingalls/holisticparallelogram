var User = require(__dirname + '/userModel.js');

module.exports.saveOne = function(req, res) {
  var user = req.body;
  User.findOrCreate({where: user})
    .then(function(createdUser) {
      res.json(createdUser);
    });
};