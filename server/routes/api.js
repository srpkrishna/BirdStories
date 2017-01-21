var express = require('express');
var api = express.Router();

/* GET home page. */
api.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = api;
