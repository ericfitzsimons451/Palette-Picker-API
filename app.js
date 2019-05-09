const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser')
app.use(bodyParser.json());
const cors = require('cors')
app.use(cors())

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then(projects => {
      response.status(200).json(projects)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select()
    .then(projects => {
      if (projects.length) {
        response.status(200).json(projects);
      } else {
        response.status(404).json({
          error: `Could not find project ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json(`Something went wrong with the server: ${error}`);
    });
});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body
  for (let requiredParam of ['project_name']) {
    if (!project[requiredParam]) {
      return response
        .status(422)
        .send({ error: `Expected format: { project_name: <String> }. You're missing the ${requiredParam} property.` })
    }
  }

  database('projects').insert(project, 'id')
    .then(projects => {
      response.status(201).json({ id: projects[0] });
    })
    .catch(error => {
      response.status(500).json(`Something went wrong with the server: ${error}`);
    });
});

app.delete('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).del()
    .then(result => {
      if (result > 0) {
        response.status(200).json(`Deleted project with id ${request.params.id}`)
      } else {
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json(`Something went wrong with the server: ${error}`)
    })
})

module.exports = app
