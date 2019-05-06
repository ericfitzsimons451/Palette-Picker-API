module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/palettePicker'
    }, 
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
