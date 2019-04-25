const server = require('../api/server.js');
const request = require('supertest');
const db = require('../data/dbConfig.js');

describe('the register endpoint', () => {
  const user = {
    username: 'test',
    password: '123'
  };

  beforeEach(() => {
    return db('user-cred').truncate();
  })

  it('should return 422 if username is missing', async () => {
    const res = await request(server).post('/api/auth/register').send({...user, username: null});
    expect(res.status).toBe(422);
  });

  it('should return 422 if password is missing', async () => {
    const res = await request(server).post('/api/auth/register').send({...user, password: null});
    expect(res.status).toBe(422);
  });

  it('should return 202 when successful', async () => {
    const res = await request(server).post('/api/auth/register').send(user);
    expect(res.status).toBe(202);
  })
});