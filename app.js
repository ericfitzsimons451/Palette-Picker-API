const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
// const cors = require('cors')
// app.use(cors())

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

app.get('/api/v1/projects/:id/palettes', (request, response) => {
  database('palettes')
    .where('project_id', request.params.id).select()
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes)
      } else {
        response.status(404).json(`There are no palettes for project ${request.params.id}`)
      }
    })
    .catch(error => {
      response.status(500).json(`Something went wrong with the server: ${error}`);
    })
})

app.get('/api/v1/projects/:id/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
    .then(palette => {
      if (palette.length) {
        response.status(200).json(palette)
      } else {
        response.status(404).json({ error: `Could not find palette with id: ${request.params.id}.`})
      }
    })
   .catch(error => {
     response.status(500).json({ error })
   })
})

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

app.post('/api/v1/projects/:id/palettes', (request, response) => {
  const palette = request.body
  for (let requiredParam of ['project_id', 'color_one', 'color_two', 'color_three', 'color_four', 'color_five']) {
    if (palette[requiredParam] === undefined) {
      return response
              .status(422)
              .send({ error: `Expected format: {
                project_id: <Integer>,
                color_one: <String>,
                color_two: <String>,
                color_three: <String>,
                color_four: <String>,
                color_five: <String>
              }.  You are missing a ${requiredParam} property.`})
    }
  }

  let palettesToCheck;
  database('palettes').select()
    .then(data => palettesToCheck = data)
    .then(() => {
      const foundPalette = palettesToCheck.find(palette => {
        return palette.color_one === request.body.color_one
      })

      if (!foundPalette) {
        database('palettes').insert(palette, 'id')
          .then(id => {
            response.status(201).json({ id: id[0] })
          })
      }
    })
})

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

app.put('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params
  const { project_name } = request.body
  let found = false

  for (let requiredParameter of ['project_name']) {
    if (request.body[requiredParameter] === undefined) {
      response.status(422).json(`Error: missing ${requiredParameter}`)
    }
  }
  database('projects').select()
    .then(projects => {
      projects.forEach(project => {
        if (project.id === parseInt(id)) {
          found = true
        }
      })
      if (!found) {
        return response.status(404).json(`Project ${id} was not found.`)
      } else {
        database('projects').where('id', id).update({ project_name })
          .then(project => {
            response.status(200).json({ id, ...request.body })
          })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
}) 

app.delete('/api/v1/palettes/:id', (request, response) => {
  const idForDelete = request.params.id
  if (!idForDelete) {
    response.status(422).json({
      error: `Missing id from request parameters`
    })
  } else {
    database('palettes')
      .where('id', request.params.id)
      .del()
      .then(() => {
        response
          .json(`Successfully deleted course with id: ${idForDelete}`)
      })
    .catch(error => {
      response.status(500).json({ error })
    })
  }
})

module.exports = app
