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
  },

  // Lists the tags for a particular movie
  listTagsFor: function(movieID) {
    return db("tag as t")
      .select("t.id", "t.name as text")
      .joinRaw("JOIN tag_movie tm ON tm.tag_id=t.id AND tm.movie_id=?", movieID)
      .then();
  },

  // Lists the actors for a particular movie
  listActorsFor: function(movieID) {
    return db("person as p")
      .select(db.raw("p.id, p.firstname || ' ' || p.lastname as text"))
      .joinRaw("JOIN actor_movie am ON am.person_id=p.id AND am.movie_id=?", movieID)
      .then();
  },

  // Returns a movie object for editing purposes w/ its associated data
  getForEdit: function(movieID) {
    var pMovie = this.getMovie(movieID);
    var pActors = this.listActorsFor(movieID);
    var pTags = this.listTagsFor(movieID);

    return Promise.all([pMovie, pActors, pTags]).then(function(results) {
      var movie = results[0];
      movie.actors = results[1];
      movie.tags = results[2];
      return movie;
    });
  },

};
