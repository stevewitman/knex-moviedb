'use strict'

var db = require("./db");
var screen = require("./screen");

screen.clear();

db('movie').count().then(function(result) {
  screen.write(result, 'pretty');
}).catch(function(err) {
  console.log(err);
}).finally(function() {
  db.destroy();
})
