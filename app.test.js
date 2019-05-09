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

  describe('GET /projects/:id/palettes', () => {
    it('should return all palettes in a project based on the request.params.id', async () => {
      const project = await database('projects').first()
      const id = project.id
      const expectedPalettes = await database('palettes').where('project_id', id)
      const response = await request(app).get(`/api/v1/projects/${id}/palettes`)
      expect(response.status).toBe(200)
      expect(response.body.length).toBe(expectedPalettes.length)
    })
  })

  describe('PUT /projects/:id', () => {
    it('should update a project name based on request.params.id', async () => {
      const project = await database('projects').first()
      const id = project.id
      const newProject = {
        project_name: 'Justin Rules'
      }
      const response = await request(app).put(`/api/v1/projects/${id}`).send(newProject)
      expect(response.body.project_name).toBe(newProject.project_name)
    })
  })
});
