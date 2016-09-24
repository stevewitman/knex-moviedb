"use-strict"

var Promise = require("bluebird");
var db = require("./db");

// All functions return a bluebird promise for their results

module.exports = {
  // QUERIES

  // list all tags
  listTags: function() {
    return db.select('id', 'name as text').from('tag').then();
  },

  // list all ratings
  listRatings: function() {
    return db.select('id', 'name as text').from('rating').then();
  },

  getMovie: function(movieID) {
    return db("movie as m")
      .join("person as p", "p.id", "m.director_id")
      .select("m.*", "p.name as director")
      .where("m.id", movieID)
      .first().then();
  }
};
