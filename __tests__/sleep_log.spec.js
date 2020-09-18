const supertest = require('supertest');
const server = require('../index');
const db = require('../data/dbConfig');


let token;

const login = async () => {
  await supertest(server).post('/auth/register').send({
    username: 'non admin user',
    password: 'password',
    email: 'email@email.com'
  });
  const response = await supertest(server).post('/auth/login').send({
    username: 'non admin user',
    password: 'password'
  });

  token = response.body.token
}
const contentType = "application/json; charset=utf-8"

// * clears db and reseeds it to initial data before each individual test
beforeEach(async () => {
  await db.migrate.latest();
  return db.seed.run();
});
// * closes any database connections after the tests in case it stays open
afterAll(async () => {
  await db.destroy();
});

describe('users integration tests', () => {

  it('POST /sleep/current-user, (can not create sleep log if not logged in)', async () => {
    const res = await supertest(server).post('/sleep/current-user');
    expect(res.statusCode).toBe(401);
    expect(res.headers['content-type']).toBe(contentType);
    expect(res.body.message).toBe('missing required token')
  })

  // ! failing test res.body is undefined
  it('POST /sleep/current-user (can not create sleep log if not logged in)', async () => {
    await login();
    if (token !== undefined) {
      const res = await supertest(server).post('/sleep/current-user').send({token: token}).send({
        bedtime: '2020-09-17 23:00:00'
      });
      expect(res.statusCode).toBe(201);
      expect(res.headers['content-type']).toBe(contentType);
      expect(res.body.bedtime).toBe('2020-09-17T23:00:00.000Z');
    }
  })

})

