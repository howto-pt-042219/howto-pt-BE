const server = require('../../api/server.js');
const request = require('supertest');
const db = require('../../data/dbConfig.js');

describe('the steps endpoint', () => {
  let mockStep = {
    title: 'Run test',
    description: 'Do this test',
    howto_id: 1
  }

  describe('post /', () => {

    xit('should return 422 if information is missing', async () => {
      const titleRes = await request(server).post('/api/steps').send({...mockStep, title: null});
      const descRes = await request(server).post('/api/steps').send({...mockStep, description: null});
      const idRes = await request(server).post('/api/steps').send({...mockStep, howto_id: null});

      expect(titleRes.status).toBe(422);
      expect(descRes.status).toBe(422);
      expect(idRes.status).toBe(422);
    });

    xit('should return 404 if howto is not found', async () => {
      const res = await request(server).post('/api/steps').send(mockStep);
      expect(res.status).toBe(404);
    })
  })
})