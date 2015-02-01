'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var env = process.env.NODE_ENV || 'development';

var routes = require('./routes');

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

routes(app);

app
  .route('/ping')
  .get(function(req, res, next){
    res.json({});
  });

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  if (env !== 'development') {
    res.status(err.status || err.statusCode || 500).send(err.message || 'internal server error!');
  }
  else {
  	console.log(err.stack);
    res.status(err.status || err.statusCode || 500).send(err);
  }
});


module.exports = app;