const supertest = require('supertest');
const server = require('../index');
const db = require('../data/dbConfig');


let token;

const login = async () => {
  await supertest(server).post('/auth/register').send({
    username: 'non admin user',
    password: 'password',
  });
  const response = await supertest(server).post('/auth/login').send({
    username: 'non admin user',
    password: 'password'
  });
  token = response.body.token
}

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

  it('GET /users/current-user, (can not get current user if not logged in)', async () => {
    const res = await supertest(server).get('/users/current-user');
    expect(res.statusCode).toBe(401);
    expect(res.headers['content-type']).toBe("application/json; charset=utf-8");
    expect(res.body.message).toBe('missing required token')
  })


  it('GET /users/current-user (can get currently logged in user)', async () => {
    await login();
    if (token !== undefined) {
      const res = await supertest(server).get('/users/current-user').send({token: token});
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe("application/json; charset=utf-8");
      expect(res.body.username).toBe('non admin user');
    }
  })

  it('PUT /users/current-user, (can not update current user if not logged' +
    ' in)', async () => {
    const res = await supertest(server).put('/users/current-user').send({
      username: 'updated name'
    });
    expect(res.statusCode).toBe(401);
    expect(res.headers['content-type']).toBe("application/json; charset=utf-8");
    expect(res.body.message).toBe('missing required token')
  })

  it('PUT /users/current-user, (can update current user if logged' +
    ' in)', async () => {
    await login();
    if (token !== undefined) {
      const res = await supertest(server).put('/users/current-user').send({
        token: token,
        username: 'updated name'
      });
      expect(res.statusCode).toBe(204);
    }
  })

  it('PUT /users/current-user, (send error if no body data sent to update' +
    ' in body to update)', async () => {
    await login();
    if (token !== undefined) {
      const res = await supertest(server).put('/users/current-user').send({token: token});
      expect(res.statusCode).toBe(400);
      expect(res.headers['content-type']).toBe("application/json; charset=utf-8");
      expect(res.body.message).toBe('Bad Request, no data sent');

    }
  })

  it('DELETE /users/current-user, (can not delete current user if not' +
    ' logged' +
    ' in)', async () => {
    const res = await supertest(server).delete('/users/current-user');
    expect(res.statusCode).toBe(401);
  })

  it('DELETE /users/current-user, (can delete current user if logged in)', async () => {
    await login();
    if (token !== undefined) {
      const res = await supertest(server).delete('/users/current-user').send({token: token});
      expect(res.statusCode).toBe(204);
    }
  })
})

