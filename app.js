var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.set('port', process.env.PORT || 3000);

// dommy data
var routes = require('./routes/recipes');
app.use("/api", routes);

app.use(function(req, res, next) { 
    var err = new Error('Page Not Found'); 
    err.status = 404; 
    next(err); 
});

app.listen(app.get('port'), function() {
  console.log("Listening on port " + app.get('port') + app.get('env'));
});