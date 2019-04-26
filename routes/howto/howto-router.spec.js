const server = require('../../api/server.js');
const request = require('supertest');
const bcrypt = require('bcryptjs');

const db = require('../../data/dbConfig.js');

describe('the howto endpoint', () => {

  describe('post /', () => {
    let mockHowto = {
      title: 'Test things',
      overview: 'Test the right things',
      user_id: 1
    };

    it('should return 422 if information is missing', async () => {
      const titleRes = await request(server).post('/api/howto').send({...mockHowto, title: null});
      const overviewRes = await request(server).post('/api/howto').send({...mockHowto, overview: null});
      const userRes = await request(server).post('/api/howto').send({...mockHowto, user_id: null});

      expect(titleRes.status).toBe(422);
      expect(overviewRes.status).toBe(422);
      expect(userRes.status).toBe(422);
    });

    it('should return 404 if user does not exist', async () => {
      const res = await request(server).post('/api/howto').send(mockHowto);

      expect(res.status).toBe(404);
    })

    it('should return 202 when successful', async () => {
      await db('user-cred').insert({
        username: 'test',
        password: bcrypt.hashSync('123', 10),
        creator: true
      });
      const res = await request(server).post('/api/howto').send(mockHowto);


      expect(res.status).toBe(202);
    })
  });
});