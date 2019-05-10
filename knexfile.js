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
    connection: 'postgres://dkndpyhvhtvmmq:04ae155a91b8b10ef7f9aa3ccc10f212855ed97b2d1beedc5b888b37a48e0fac@ec2-54-235-208-103.compute-1.amazonaws.com:5432/d5t218i9skkfha',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  }
};
