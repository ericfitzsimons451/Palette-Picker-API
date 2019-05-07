// import request from 'supertest';
// import server from './server';
const environment = process.env.NODE_ENV || 'test';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

describe('/api/v1', () => {
  beforeEach(async () => {
    await database.seed.run();
  });
  describe('GET /projects', () => {
    it('should return all projects in database', async () => {
      console.log('oi were the dopeness')
    });
  });
});
