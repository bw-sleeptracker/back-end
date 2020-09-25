// const supertest = require('supertest');
// const server = require('../index');
// const db = require('../data/dbConfig');
//
// const username = 'auth user test'
//
// const dummyUser = {
//   username: username,
//   password: 'password',
//   email: 'email@email.com'
// }
// const contentType = "application/json; charset=utf-8"
// let token;
//
// const login = async () => {
//   await supertest(server).post('/auth/register').send(dummyUser);
//   const response = await supertest(server).post('/auth/login').send(dummyUser);
//   token = response.body.token
// }
//
// // * clears db and reseeds it to initial data before each individual test
//   beforeEach(async () => {
//     // await db.migrate.latest();
//     return db.seed.run();
//   });
// // * closes any database connections after the tests in case it stays open
//   afterAll(async () => {
//     await db.destroy();
//   });
//
//   describe('auth integration tests', () => {
//
//     it('POST /auth/register, (creates a new user)', async () => {
//       const res = await supertest(server).post('/auth/register').send(dummyUser);
//       expect(res.statusCode).toBe(201);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe('User successfully created')
//     })
//
//     it('POST /auth/register, (error status 400 and descriptive message if' +
//       ' missing password)', async () => {
//       const res = await supertest(server).post('/auth/register').send({
//         username: 'user1',
//       });
//       expect(res.statusCode).toBe(400);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe('no password supplied')
//     })
//
//     it('POST /auth/register, (error status 400 and descriptive message if' +
//       ' missing username)', async () => {
//       const res = await supertest(server).post('/auth/register').send({
//         password: 'password',
//       });
//       expect(res.statusCode).toBe(400);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe('no username supplied')
//     })
//
//     it('POST /auth/register, (error status 400 and descriptive message if username already exists)', async () => {
//       const res = await supertest(server).post('/auth/register').send({
//         username: 'joe',
//         password: 'password',
//         email: 'joe@joe.com'
//       });
//       expect(res.statusCode).toBe(400);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe("username already taken")
//     })
//
//     it('POST /auth/register, (error status 400 and descriptive message if' +
//       ' email' +
//       ' already exists)', async () => {
//       const res = await supertest(server).post('/auth/register').send({
//         username: 'joey',
//         password: 'password',
//         email: 'joe@joe.com'
//       });
//       expect(res.statusCode).toBe(400);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe("email already taken")
//     })
//
//     it('POST /auth/login, (logs a user in)', async () => {
//       await supertest(server).post('/auth/register').send(dummyUser);
//       const res = await supertest(server).post('/auth/login').send(dummyUser);
//       expect(res.statusCode).toBe(200);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe(`Welcome ${username}!`)
//     })
//
//     it('POST /auth/login, (error status 401 if invalid credentials)', async () => {
//       const res = await supertest(server).post('/auth/login').send({
//         username: 'jess',
//         password: 'wrongpassword'
//       });
//       expect(res.statusCode).toBe(401);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe('Invalid Credentials')
//     })
//
//     it('POST /auth/login, (error status 400 and descriptive message if' +
//       ' missing password)', async () => {
//       const res = await supertest(server).post('/auth/register').send({
//         username: 'jess',
//       });
//       expect(res.statusCode).toBe(400);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe('no password supplied')
//     })
//
//     it('POST /auth/login, (error status 400 and descriptive message if' +
//       ' missing username)', async () => {
//       const res = await supertest(server).post('/auth/register').send({
//         password: 'password',
//       });
//       expect(res.statusCode).toBe(400);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe('no username supplied')
//     })
//
//     it('GET /auth/logout, (can not log a user out if not logged in)', async () => {
//       await login();
//       const res = await supertest(server).get('/auth/logout').send({token: token});
//       expect(res.statusCode).toBe(200);
//     })
//
//     it('GET /auth/logout, (logs a user out if logged in)', async () => {
//       const res = await supertest(server).get('/auth/logout');
//       expect(res.statusCode).toBe(401);
//     })
//   })
