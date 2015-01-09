var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.set('port', (process.env.PORT || 3000));

// app.get('/', function(req, res) {
//   res.send("gotten to home page");
// })
// dommy data
var routes = require('./routes/recipes');
app.use("/api", routes);

// app.use(function(req, res, next) { 
//     var err = new Error('Page Not Found'); 
//     err.status = 404; 
//     next(err); 
// });
//to allow cross browsers api calls
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

app.listen(app.get('port'), function() {
  console.log("Listening on port " + app.get('port') + app.get('env'));
});