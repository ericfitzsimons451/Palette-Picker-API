module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/palettepicker',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/palettepicker_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  }
};
