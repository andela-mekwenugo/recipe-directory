var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/recipeDirectory';
if (process.NODE_ENV === 'production') {
  dbURI = 'mongodb://recipe:divinemimi@ds029541.mongolab.com:29541/recipe'
}
mongoose.connect(dbURI);
var db = mongoose.connection

// //outputs message to console, depending on connection status
db.on('error', console.error.bind(console, 'connection error: '));
db.once('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
})

// //app database model
var recipesSchema = mongoose.Schema({
  name: {type: String, required: true, trim: true},
  cuisine: {type: String, trim: true},
  equipments: {type: [String], required: true, trim: true},
  ingredients: {type: [String], required: true, trim: true},
  method: {type: [String], required: true, trim: true}
});

mongoose.model('Recipe', recipesSchema);