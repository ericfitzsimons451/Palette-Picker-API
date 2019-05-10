const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const request = require('supertest')
const app = require('./app')

describe('/api/v1', () => {
  beforeEach(async () => {
    await database.seed.run();
  });

  describe('GET /projects', () => {
    it('should return all projects in database', async () => {
      const expected = await database('projects').select()
      const response = await request(app).get('/api/v1/projects')
      expect(response.status).toBe(200)
      expect(response.body.length).toBe(expected.length)
    });
  });

  describe('GET /projects/:id', () => {
    it('should return a single project', async () => {
      const expectedProject = await database('projects').first();
      const id = expectedProject.id;
      const response = await request(app).get(`/api/v1/projects/${id}`);
      const result = response.body[0];
      expect(response.status).toBe(200);
      expect(result.project_name).toEqual(expectedProject.project_name);
    });

    it('should return an error message if id doesnt exist', async () => {
      const id = 99999;
      const response = await request(app).get(`/api/v1/projects/${id}`);
      const expectedText = `Error: Could not find project ${id}.`;
      expect(response.status).toBe(404);
      expect(response.text).toEqual(expectedText);
    });
  });

  describe('GET /projects/:id/palettes', () => {
    it('should return all palettes in a project based on the request.params.id', async () => {
      const project = await database('projects').first()
      const id = project.id
      const expectedPalettes = await database('palettes').where('project_id', id)
      const response = await request(app).get(`/api/v1/projects/${id}/palettes`)
      expect(response.status).toBe(200)
      expect(response.body.length).toBe(expectedPalettes.length)
    })

    it('should return an error message if id doesnt exist', async () => {
      const id = 99999
      const expectedText = `Error: Could not find project ${id}.`
      const response = await request(app).get(`/api/v1/projects/${id}`)
      expect(response.status).toBe(404)
      expect(response.text).toEqual(expectedText)
    } )
  })  

  describe('GET /projects/:id/palettes/:palette_id', () => {
    it('should return a single palette with the specified id', async () => {
      const project = await database('projects').first()
      const id = project.id
      const palettes = await database('palettes').where('project_id', id).first()
      const palette_id = palettes.id
      const response = await request(app).get(`/api/v1/projects/${id}/palettes/${palette_id}`)
      expect(response.status).toBe(200)
      expect(response.body[0].color_one).toEqual(palettes.color_one)
    })

    it('should return an error message if id doesnt exist', async () => {
      const id = 99999;
      const response = await request(app).get(`/api/v1/projects/${id}/palettes`);
      const expectedText = `There are no palettes for project ${id}.`;
      expect(response.status).toBe(404);
      expect(response.text).toEqual(expectedText);
    });
  })

  describe('PUT /projects/:id', () => {
    it('should update a project name based on request.params.id', async () => {
      const project = await database('projects').first()
      const id = project.id
      const newProject = {
        project_name: 'Justin Rules'
      }
      const response = await request(app).put(`/api/v1/projects/${id}`).send(newProject)
      expect(response.status).toBe(200)
      expect(response.body.project_name).toBe(newProject.project_name)
    })

    it('should return an error if the project id is invalid', async () => {
      const newProject = {
        id: 99999,
        project_name: "Justin Rules"
      }
      const expectedText = `Project ${newProject.id} was not found.`
      const response = await request(app).put(`/api/v1/projects/${newProject.id}`).send(newProject)
      expect(response.status).toBe(404)
      expect(response.text).toEqual(expectedText)
    })
  })

  describe('PUT /projects/:id/palettes/:palette_id', () => {
    it('should return a palette from a project based on the request.params.id', async () => {
      const project = await database('projects').first()
      const id = project.id
      const palettes = await database('palettes').where('project_id', id).first()
      const palette_id = palettes.id.toString()
      const newPalette = {
        color_one: 'asdf',
        color_two: 'asdf',
        color_three: 'asdf',
        color_four: 'asdf',
        color_five: 'asdf'
      }
      const response = await request(app).put(`/api/v1/projects/${id}/palettes/${palette_id}`).send(newPalette)
      expect(response.status).toBe(200)
      expect(response.body).toEqual({palette_id: palette_id, ...newPalette})
    })
  })

  describe('POST /projects', () => {
    it('should post a new project to the db', async () => {
      const newProject = { project_name: 'Pugs, man.  Pugs.' }
      const response = await request(app)
        .post('/api/v1/projects')
        .send(newProject);
      const projects = await database('projects').where('id', response.body.id).select();
      const project = projects[0];
      expect(response.status).toBe(201);
      expect(project.project_name).toEqual(newProject.project_name);
    });

    it('should give an error message if project_name isnt given', async () => {
      const newProject = { project_name: '' }
      const response = await request(app)
        .post('/api/v1/projects')
        .send(newProject);
      const expectedMsg = `Error: Expected format: { project_name: <String> }. You're missing the project_name property.`;
      expect(response.status).toBe(422);
      expect(response.text).toBe(expectedMsg);
    });
  });

  describe('POST /projects/:id/palettes', () => {
    it('should add a new palette', async () => {
      const project = await database('projects').first()
      const project_id = project.id
      const newPalette = {
        project_id,
        color_one: 'asdf',
        color_two: 'asdf',
        color_three: 'asdf',
        color_four: 'asdf',
        color_five: 'asdf'
      }
      const response = await request(app).post(`/api/v1/projects/${project_id}/palettes`).send(newPalette)
      expect(response.status).toBe(201);
      expect(response.body.project_id).toEqual(project_id)
    })
  })

  describe('DELETE /projects/:id', () => {
    it('should delete a project from the database', async () => {
      const projectToDelete = await database('projects').first();
      const id = projectToDelete.id      
      const response = await request(app).delete(`/api/v1/projects/${id}`);
      const expectedMsg = `Project with the id: ${id} and it's palettes have been deleted.`;
      expect(response.status).toBe(200);
      expect(response.text).toBe(expectedMsg);
    });
  })

  describe('DELETE /palettes/:id', () => {
    it('should delete a palette by id', async () => {
      const paletteToDelete = await database('palettes').first();
      const id = paletteToDelete.id      
      const response = await request(app).delete(`/api/v1/palettes/${id}`);
      const expectedMsg = `Successfully deleted palette with id: ${id}.`;
      expect(response.status).toBe(200);
      expect(response.text).toEqual(expectedMsg);
    })
  })
});