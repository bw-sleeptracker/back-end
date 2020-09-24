// const supertest = require('supertest');
// const server = require('../index');
// const db = require('../data/dbConfig');
//
// const validDayLogId = '2c56584b-aad7-48c6-a85d-4b57d093bc0f'
// const invalidDayLogId = '2c56584b-aad6-48c6-a85d-4b57d093bc0f'
//
// let token;
//
// const login = async () => {
//   await supertest(server).post('/auth/register').send({
//     username: 'non admin user',
//     password: 'password',
//     email: 'email@email.com'
//   });
//   const response = await supertest(server).post('/auth/login').send({
//     username: 'non admin user',
//     password: 'password'
//   });
//
//   token = response.body.token
// }
// const contentType = "application/json; charset=utf-8"
// // * clears db and reseeds it to initial data before each individual test
// beforeEach(async () => {
//   await db.migrate.latest();
//   return db.seed.run();
// });
// // * closes any database connections after the tests in case it stays open
// afterAll(async () => {
//   await db.destroy();
// });
//
// describe('day log integration tests', () => {
//
//
//   it('POST /day/current-user, (can not create sleep day log if not logged' +
//     ' in)', async () => {
//     const res = await supertest(server).post('/day/current-user');
//     expect(res.statusCode).toBe(401);
//     expect(res.headers['content-type']).toBe(contentType);
//     expect(res.body.message).toBe('missing required token')
//   })
//
//   it('POST /day/current-user, (sends descriptive error if no bedtime sent' +
//     ' in the body when trying to create new sleep day log)', async () => {
//     await login();
//     if (token !== undefined) {
//       const res = await supertest(server).post('/day/current-user').send({token: token}).send({});
//       expect(res.statusCode).toBe(400);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe('no bedtime supplied')
//     }
//   })
//
//   it('POST /day/current-user (can create sleep day log if logged in)', async () => {
//     await login();
//     if (token !== undefined) {
//       const res = await supertest(server).post('/day/current-user').send({token: token}).send({
//         bedtime: "23:00:00"
//       });
//       expect(res.statusCode).toBe(201);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.bedtime).toBe('23:00:00');
//     }
//   })
// })
//
// it('PUT /day/:id, (can not update sleep day log if not logged' +
//   ' in)', async () => {
//   const res = await supertest(server).put(`/day/${validDayLogId}`);
//   expect(res.statusCode).toBe(401);
//   expect(res.headers['content-type']).toBe(contentType);
//   expect(res.body.message).toBe('missing required token')
// })
//
// it('PUT /day/:id, (sends descriptive error if no data sent' +
//   ' in the body when trying to update sleep day log)', async () => {
//   await login();
//   if (token !== undefined) {
//     const res = await supertest(server).put(`/day/${validDayLogId}`).send({token: token}).send({});
//     expect(res.statusCode).toBe(400);
//     expect(res.headers['content-type']).toBe(contentType);
//     expect(res.body.message).toBe('no data supplied')
//   }
// })
//
// it('PUT /day/:id, (sends descriptive error if bad  day log id sent when' +
//   ' trying to update day log)', async () => {
//   await login();
//   if (token !== undefined) {
//     const res = await supertest(server).put(`/day/${invalidDayLogId}`).send({token: token}).send({
//       wake_time: "06:00:00",
//       wake_score: 2,
//       day_score: 1,
//       bedtime_score: 3
//     });
//     expect(res.statusCode).toBe(400);
//     expect(res.headers['content-type']).toBe(contentType);
//     expect(res.body.message).toBe('Invalid day_log ID')
//   }
// })
//
// it('PUT /day/:id, (can update sleep day log if user is logged in and' +
//   ' sends required data)', async () => {
//   await login();
//   if (token !== undefined) {
//     const res = await supertest(server).put(`/day/${validDayLogId}`).send({token: token}).send({
//       wake_time: "06:00:00",
//       wake_score: 2,
//       day_score: 1,
//       bedtime_score: 3
//     });
//     expect(res.statusCode).toBe(201);
//     expect(res.headers['content-type']).toBe(contentType);
//     expect(res.body.wake_time).toBe('06:00:00')
//   }
// })
//
// it('GET /day/current-user/search/date?={date}, (can not get sleep day log' +
//   ' if' +
//   ' not' +
//   ' logged' +
//   ' in)', async () => {
//   const res = await supertest(server).get(`/day/current-user/search?date=2020-09-18`);
//   expect(res.statusCode).toBe(401);
//   expect(res.headers['content-type']).toBe(contentType);
//   expect(res.body.message).toBe('missing required token')
// })
//
// it('GET /day/current-user/searchdate?={date}, (sends descriptive error if' +
//   ' invalid date sent when trying to get day log by date query)', async () => {
//   await login();
//   if (token !== undefined) {
//     const res = await supertest(server).get(`/day/current-user/search?date=2020-09-1`).send({token: token});
//     expect(res.statusCode).toBe(400);
//     expect(res.headers['content-type']).toBe(contentType);
//     expect(res.body.message).toBe('no valid date supplied')
//   }
// })
// it('GET /day/current-user/search/date?={date}, (returns the sleep day log for' +
//   ' date provided)', async () => {
//   await login();
//   if (token !== undefined) {
//     await supertest(server).post('/day/current-user').send({token: token}).send({
//       bedtime: "23:00:00"
//     });
//     // ! the date provided for the query and expected need to be todays
//     // ! date for test to pass
//     const res = await supertest(server).get(`/day/current-user/search?date=2020-09-20`).send({token: token});
//     expect(res.statusCode).toBe(200);
//     expect(res.headers['content-type']).toBe(contentType);
//     expect(res.body.date).toBe('2020-09-20T04:00:00.000Z')
//   }
// })
//
// it('GET /day/current-user, (can not get all users day logs if not' +
//   ' logged in)', async () => {
//   const res = await supertest(server).get(`/day/current-user`);
//   expect(res.statusCode).toBe(401);
//   expect(res.headers['content-type']).toBe(contentType);
//   expect(res.body.message).toBe('missing required token')
// })
//
// it('GET /day/current-user, (can get all sleep day logs if user logged' +
//   ' in)', async () => {
//   await login();
//   if (token !== undefined) {
//     await supertest(server).post('/day/current-user').send({token: token}).send({
//       bedtime: "2020-09-17 23:00:00"
//     });
//     const res = await supertest(server).get(`/day/current-user`).send({token: token});
//     expect(res.statusCode).toBe(200);
//     expect(res.headers['content-type']).toBe(contentType);
//     expect(res.body.length).toBe(1)
//   }
// })
//
//
// it('GET /day/:id, (can not get sleep day log by id if not logged in)', async () => {
//   const res = await supertest(server).get(`/day/${validDayLogId}`);
//   expect(res.statusCode).toBe(401);
//   expect(res.headers['content-type']).toBe(contentType);
//   expect(res.body.message).toBe('missing required token')
// })
//
// it('GET /day/:id, (returns a descriptive message if bad sleep day log' +
//   ' id' +
//   ' provided)', async () => {
//   await login();
//   if (token !== undefined) {
//     const res = await supertest(server).get(`/day/${invalidDayLogId}`).send({token: token});
//     expect(res.statusCode).toBe(400);
//     expect(res.headers['content-type']).toBe(contentType);
//     expect(res.body.message).toBe('Invalid day_log ID')
//   }
// })
//
// it('GET /day/:id, (can get sleep day log by id if user logged' +
//   ' in)', async () => {
//   await login();
//   if (token !== undefined) {
//     const res = await supertest(server).get(`/day/${validDayLogId}`).send({token: token});
//     expect(res.statusCode).toBe(200);
//     expect(res.headers['content-type']).toBe(contentType);
//     expect(res.body.date).toBe('2020-09-20T04:00:00.000Z')
//   }
// })
//
// it('DELETE /day/:id, (can not delete sleep day log by id if not logged' +
//   ' in)', async () => {
//   const res = await supertest(server).delete(`/day/${validDayLogId}`);
//   expect(res.statusCode).toBe(401);
//   expect(res.headers['content-type']).toBe(contentType);
//   expect(res.body.message).toBe('missing required token')
// })
//
// it('DELETE /day/:id, (returns a descriptive message if bad sleep log id' +
//   ' provided when trying to delete day log)', async () => {
//   await login();
//   if (token !== undefined) {
//     const res = await supertest(server).delete(`/day/${invalidDayLogId}`).send({token: token});
//     expect(res.statusCode).toBe(400);
//     expect(res.headers['content-type']).toBe(contentType);
//     expect(res.body.message).toBe('Invalid day_log ID')
//   }
// })
//
// it('DELETE /day/:id, (can dlete sleep day log by id if user logged' +
//   ' in)', async () => {
//   await login();
//   if (token !== undefined) {
//     const res = await supertest(server).delete(`/day/${validDayLogId}`).send({token: token});
//     expect(res.statusCode).toBe(204);
//   }
// })
//
//
//
