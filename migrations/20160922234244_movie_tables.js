
exports.up = function(knex, Promise) {
  return knex.schema

  // rating table
  .createTable('rating', function(tbl) {
    // pk
    tbl.increments();

    // uq
    tbl.string('name', 5).notNullable().unique('uq_rating_name');
  })

  // mavie table
  .createTable('movie', function(tbl) {
    // pk
    tbl.increments();

    // fk
    tbl.integer('rating_id').notNullable().references('id').inTable('rating');
    tbl.integer('director_id').notNullable().references('id').inTable('person');

    // fields
    tbl.string('title', 200).notNullable().defaultTo('');
    tbl.string('overview', 999);
    tbl.integer('releaseyr');
    tbl.integer('score').notNullable().defaultTo(7);
    tbl.integer('runtime').notNullable().defaultTo(90);
    tbl.date('lastplaydt');
  })

  // rating tag
  .createTable('tag', function(tbl) {
    // pk
    tbl.increments();

    // uq
    tbl.string('name', 5).notNullable().unique('uq_tag_name');
  })

  // tag_movie
  .createTable('tag_movie', function(tbl) {
    // pk/fk
    tbl.integer('tag_id').notNullable().references('id').inTable('tag').onDelete('CASCADE');
    tbl.integer('movie_id').notNullable().references('id').inTable('movie').onDelete('CASCADE');
    tbl.primary(['tag_id', 'movie_id'])
  })

  // actor_movie
  .createTable('actor_movie', function(tbl) {
    // pk/fk
    tbl.integer('person_id').notNullable().references('id').inTable('person').onDelete('CASCADE');
    tbl.integer('movie_id').notNullable().references('id').inTable('movie').onDelete('CASCADE');
    tbl.primary(['person_id', 'movie_id'])
  })

};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('actor_movie')
    .dropTable('tag_movie')
    .dropTable('tag')
    .dropTable('movie')
    .dropTable('rating');
};
