var fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function text(response) {
  return response.text();
}

function parseTSV(response) {
  var lines = response.trim().split('\n');
  var keys = lines[0].split('\t');
  lines.shift();
  return lines.map(function(line) {
    return line.split('\t').reduce(function(obj, value, i) {
      obj[keys[i]] = value;
      return obj
    }, {});
  });
}

router
  .route('/')
  .get(function(req, res, next) {
    Promise.all(
      [fetch('http://www.lackeyccg.com/pokemon/carddata.txt')
        .then(status)
        .then(text)
        .then(parseTSV)
      ,
      fetch('http://www.lackeyccg.com/pokemon/carddata2.txt')
        .then(status)
        .then(text)
        .then(parseTSV)
      ]
    )
      .then(function(cardData) {
        res.send(cardData.reduce(function(a, b) {
          return a.concat(b);
        }));
      })
  });

module.exports = function(app) {
  app.use('/pokemon', router);
}
