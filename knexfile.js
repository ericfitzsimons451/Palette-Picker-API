module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: 'postgres://localhost/palettePicker'
    }, 
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
