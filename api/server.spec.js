const server = require('./server.js');
const request = require('supertest');

describe('the testing server', () => {

  it('should run the testing database', () => {
    const env = process.env.DB_ENV;
    expect(env).toBe('testing');
  });
});