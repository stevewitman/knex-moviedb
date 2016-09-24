'use strict'

var db = require("./db");
var screen = require("./screen");
var mRepo = require("./movie-repo");
var pRepo = require("./person-repo");

screen.clear();

mRepo.getMovie(2).then(function(result) {
  screen.write(result, 'pretty');
}).catch(function(err) {
  console.log(err);
}).finally(function() {
  db.destroy();
})
