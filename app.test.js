const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const request = require('supertest')
const server = require('./app')

describe('/api/v1', () => {

  beforeEach(async () => {
    await database.seed.run();
  });

  describe('GET /projects', () => {
    it('should return all projects in database', async () => {
      const expected = await database('projects').select()
      const response = await request(server).get('/api/v1/projects')
      expect(response.status).toBe(200)
      expect(response.body.length).toBe(expected.length)
    });
  });

  
});
