var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// //database connection to mongodb via mongoose
// var dbURI = 'mongodb://localhost/recipeDirectory';
// mongoose.connect(dbURI);
// var db = mongoose.connection

// //outputs message to console, depending on connection status
// db.on('error', console.error.bind(console, 'connection error: '));
// db.once('connected', function() {
//   console.log('Mongoose connected to ' + dbURI);
// })

// //app database model
// var recipesSchema = mongoose.Schema({
//   name: String,
//   Cuisine: String,
//   Equipments: [String],
//   ingredients: [String],
//   method: [String]
// });

var app = express();
app.use(bodyParser.urlencoded({extended:false}));


// dommy data
var routes = require('./routes/recipes');

app.use("/recipes", routes);

app.listen(3000, function() {
  console.log("Listening on port 3000");
});