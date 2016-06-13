var express = require('express');
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var database = require('./config/database'); // load the database config
var config = require('./config/config'); // load the app config
var app = express(); // create app
var port = config.port;

// configuration ---------------------------------------------------------------
mongoose.connect(database.url); // connect to mongoDB database

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// routes ----------------------------------------------------------------------
require('./app/routes.js')(app);

// listen port -----------------------------------------------------------------
app.listen(port);

console.log("App listening on port " + port);


exports.listen = function () {
};

exports.close = function (callback) {
  
};
// Start app with "node server.js"
