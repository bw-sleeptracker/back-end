const supertest = require('supertest');
const server = require('../index');
const db = require('../data/dbConfig');

const validSleepLogId = '2c56584b-aad7-48c6-a85d-4b57d093bc0f'
const invalidSleepLogId = '2c56584b-aad6-48c6-a85d-4b57d093bc0f'

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
module.exports = describe('sleep router endpoints', () => {
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

    it('POST /sleep/current-user, (sends descriptive error if no bedtime sent' +
      ' in the body)', async () => {
      await login();
      if (token !== undefined) {
        const res = await supertest(server).post('/sleep/current-user').send({token: token}).send({});
        expect(res.statusCode).toBe(400);
        expect(res.headers['content-type']).toBe(contentType);
        expect(res.body.message).toBe('no bedtime supplied')
      }
    })

    it('POST /sleep/current-user (can create sleep log if logged in)', async () => {
      await login();
      if (token !== undefined) {
        const res = await supertest(server).post('/sleep/current-user').send({token: token}).send({
          bedtime: "2020-09-17 23:00:00"
        });
        expect(res.statusCode).toBe(201);
        expect(res.headers['content-type']).toBe(contentType);
        expect(res.body.bedtime).toBe('2020-09-18T03:00:00.000Z');
      }
    })
  })

  it('PUT /sleep/:id, (can not update sleep log if not logged' +
    ' in)', async () => {
    const res = await supertest(server).put(`/sleep/${validSleepLogId}`);
    expect(res.statusCode).toBe(401);
    expect(res.headers['content-type']).toBe(contentType);
    expect(res.body.message).toBe('missing required token')
  })

  it('PUT /sleep/:id, (sends descriptive error if no data sent' +
    ' in the body)', async () => {
    await login();
    if (token !== undefined) {
      const res = await supertest(server).put(`/sleep/${validSleepLogId}`).send({token: token}).send({});
      expect(res.statusCode).toBe(400);
      expect(res.headers['content-type']).toBe(contentType);
      expect(res.body.message).toBe('no data supplied')
    }
  })

  it('PUT /sleep/:id, (sends descriptive error if bad sleep log id sent)', async () => {
    await login();
    if (token !== undefined) {
      const res = await supertest(server).put(`/sleep/${invalidSleepLogId}`).send({token: token}).send({
        wake_time: "2020-09-18 06:00:00",
        wake_score: 2,
        day_score: 1,
        bedtime_score: 3
      });
      expect(res.statusCode).toBe(400);
      expect(res.headers['content-type']).toBe(contentType);
      expect(res.body.message).toBe('Invalid sleep_log ID')
    }
  })

  it('PUT /sleep/:id, (can update sleep log if user is logged in and' +
    ' sends required data)', async () => {
    await login();
    if (token !== undefined) {
      const res = await supertest(server).put(`/sleep/${validSleepLogId}`).send({token: token}).send({
        wake_time: "2020-09-18 06:00:00",
        wake_score: 2,
        day_score: 1,
        bedtime_score: 3
      });
      expect(res.statusCode).toBe(201);
      expect(res.headers['content-type']).toBe(contentType);
      expect(res.body.wake_time).toBe('2020-09-18T10:00:00.000Z')
    }
  })

  it('GET /sleep/current-user/date?={date}, (can not update sleep log if not' +
    ' logged' +
    ' in)', async () => {
    const res = await supertest(server).get(`/sleep/current-user/?date=2020-09-18`);
    expect(res.statusCode).toBe(401);
    expect(res.headers['content-type']).toBe(contentType);
    expect(res.body.message).toBe('missing required token')
  })

  it('GET /sleep/current-user/date?={date}, (sends descriptive error if invalid date sent)', async () => {
    await login();
    if (token !== undefined) {
      const res = await supertest(server).get(`/sleep/current-user/?date=2020-09-1`).send({token: token});
      expect(res.statusCode).toBe(400);
      expect(res.headers['content-type']).toBe(contentType);
      expect(res.body.message).toBe('no valid date supplied')
    }
  })
  // ! failing .. res.body.date undefined
  it('GET /sleep/current-user/date?={date}, (returns the sleep log for date provided)', async () => {
    await login();
    if (token !== undefined) {
      await supertest(server).post('/sleep/current-user').send({token: token}).send({
        bedtime: "2020-09-17 23:00:00"
      });
      const res = await supertest(server).get(`/sleep/current-user/?date=2020-09-18`).send({token: token});
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe(contentType);
      console.log(res.body)
      expect(res.body.date).toBe('2020-09-18T04:00:00.000Z')
    }
  })

})

