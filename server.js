const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();
app.use(express.json());
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(`App is running on localhost: ${app.get('port')}.`)
});