exports.up = function(knex, Promise)
{
	return knex.schema

	//<rating>
	.createTable('rating', function(tbl)
	{
		//PK
		tbl.increments();

		//UQ
		tbl.string('name', 5).notNullable().unique('uq_rating_name');
	})

	//<movie>
	.createTable('movie', function(tbl)
	{
		//PK
		tbl.increments();

		//FK
		tbl.integer('rating_id').notNullable().references('id').inTable('rating');
		tbl.integer('director_id').references('id').inTable('person');

		//Fields
		tbl.string('title', 200).notNullable().defaultTo('');
        tbl.string('overview', 999);
        tbl.integer('releaseyr');
        tbl.integer('score').notNullable().defaultTo(7);
        tbl.integer('runtime').notNullable().defaultTo(90);
        tbl.date('lastplaydt');
	})

	//<tag>
    .createTable('tag', function (tbl)
    {
        //PK
        tbl.increments();

        //UQ
        tbl.string('name', 30).notNullable().unique('uq_tag_name');
    })

	//<tag_movie>
    .createTable('tag_movie', function (tbl)
    {
        //PK/FK
        tbl.integer('tag_id').notNullable().references('id').inTable('tag').onDelete('CASCADE');
		tbl.integer('movie_id').notNullable().references('id').inTable('movie').onDelete('CASCADE');
		tbl.primary(['tag_id', 'movie_id']);
    })

	//<actor_movie>
    .createTable('actor_movie', function (tbl)
    {
        //PK/FK
        tbl.integer('person_id').notNullable().references('id').inTable('person').onDelete('CASCADE');
		tbl.integer('movie_id').notNullable().references('id').inTable('movie').onDelete('CASCADE');
		tbl.primary(['person_id', 'movie_id']);
    });

};

exports.down = function(knex, Promise)
{
	return knex.schema
		.dropTable('actor_movie')
        .dropTable('tag_movie')
        .dropTable('tag')
        .dropTable('movie')
        .dropTable('rating');
};
