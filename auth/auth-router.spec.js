const server = require('../api/server.js');
const request = require('supertest');
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');

let user = {
  username: 'test',
  password: '123',
  creator: true
};

const hash = bcrypt.hashSync(user.password, 10);

describe('the register endpoint', () => {

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
  });

});

describe('the login endpoint', () => {

  beforeEach(() => {
    return db('user-cred').truncate();
  })
  
  it('should return 422 it username is missing', async () => {
    const res = await request(server).post('/api/auth/login').send({...user, username: null});
    expect(res.status).toBe(422);
  });

  it('should return 422 it password is missing', async () => {
    const res = await request(server).post('/api/auth/login').send({...user, password: null});
    expect(res.status).toBe(422);
  });

  it('should return 202 if successful', async () => {
    await db('user-cred').insert({...user, password: hash});
    const res = await request(server).post('/api/auth/login').send(user);
    expect(res.status).toBe(202);
  })
});