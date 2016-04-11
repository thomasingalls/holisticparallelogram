var

var View = sequelize.define('view', {
  name: {
    type: Sequelize.STRING,
    field: 'name' // this attribute sets the name in the database
  },
  address: {
    type: Sequelize.STRING
  },
  timestamps: true,
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


// this is an example of how to add a new View
// to be used in apiController eventually
View.sync({force: true}).then(function () {
  // Table created
  return View.create({
    view_name: 'Rooftop Garden Near You',
    address: '123 Market Street, Avalon, USA'
  });
});
// Example of how to use promises with sequelize
User.findOne().then(function (user) {
    console.log(user.name);
});

module.exports = View;