var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// //database connection to mongodb via mongoose

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
// require('./models/db');


// dommy data
var routes = require('./routes/recipes');
app.use("/recipes", routes);


app.listen(3000, function() {
  console.log("Listening on port 3000");
});