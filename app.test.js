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

  describe('GET /projects/:id/palettes/:palette_id', () => {
    it('should return a single palette with the specified id', async () => {
      const project = await database('projects').first()
      const id = project.id
      const palettes = await database('palettes').where('project_id', id).first()
      const palette_id = palettes.id
      const response = await request(app).get(`/api/v1/projects/${id}/palettes/${palette_id}`)
      expect(response.body[0].color_one).toEqual(palettes.color_one)
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
  });

  describe('DELETE /projects/:id', () => {
    it('should delete a project from the database', async () => {
      const projectToDelete = await database('projects').first();
      const id = projectToDelete.id      
      const response = await request(app).delete(`/api/v1/projects/${id}`);
      const expectedMsg = `\"Project with the id: ${id} and it's palettes have been deleted.\"`;
      expect(response.status).toBe(200);
      expect(response.text).toBe(expectedMsg);
    });
  })
});


