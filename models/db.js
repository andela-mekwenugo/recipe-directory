var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/recipeDirectory';
if (process.NODE_ENV === 'production') {
  dbURI = 'mongodb://heroku_app33124305:aedrr86aent2ck11mdt3ckd1fg@ds031681.m
ongolab.com:31681/heroku_app33124305'
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