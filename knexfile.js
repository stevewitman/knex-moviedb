module.exports =
{
  development:
  {
    client: "sqlite3",
    connection: { filename: "./movie.sqlite"  },
    migrations: { tableName: 'knex_migrations'},
    seeds:      { directory: './seeds'        },
    debug: false
  },

  production:
  {
    client: "pg",
    connection:
    {
      host    : 'localhost',
      user    : 'sw',
      database: 'movie',
      password: 'sprite',
    },
    migrations: { tableName: 'knex_migrations' },
    seeds:      { directory: './seeds'         },
    debug: false
  }
};
