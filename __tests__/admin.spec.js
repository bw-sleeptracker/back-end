// const supertest = require('supertest');
// const server = require('../index');
// const db = require('../data/dbConfig');
//
// const validId = '4f95d22e-21a9-4ee4-9e9a-b14479b36556'
// const invalidId = '4f95d22e-21a9-4ee4-9e9a-b14479b365'
// const contentType = "application/json; charset=utf-8"
//
// let token;
//
// const login = async () => {
//   await supertest(server).post('/auth/register').send({
//     username: 'testUser',
//     password: 'password',
//     email: 'email@email.com',
//     admin: true,
//   });
//   const response = await supertest(server).post('/auth/login').send({
//     username: 'testUser',
//     password: 'password'
//   });
//   token = response.body.token
// }
//
//   // * clears db and
//   // reseeds to initial data before each individual test
//   beforeEach(async () => {
//     // await db.migrate.latest();
//     return db.seed.run();
//   });
// // * closes any database connections after the tests in case it stays open
//   afterAll(async () => {
//     await db.destroy();
//   });
//
//   describe('admin integration tests', () => {
//
//     it('GET /admin/users, (can not get users if not admin)', async () => {
//       const res = await supertest(server).get('/admin/users');
//       expect(res.statusCode).toBe(401);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe('missing required token')
//     })
//
//     it('GET /admin/users (can get an array of all users if admin)', async () => {
//       await login();
//       if (token !== undefined) {
//         const res = await supertest(server).get('/admin/users').send({token: token});
//         expect(res.statusCode).toBe(200);
//         expect(res.headers['content-type']).toBe(contentType);
//       }
//     })
//
//     it('GET /admin/users/:id, (can not get' +
//       ' user by id if not admin)', async () => {
//       const res = await supertest(server).get(`/admin/users/${validId}`);
//       expect(res.statusCode).toBe(401);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe('missing required token')
//     })
//
//     it('GET /admin/users/:id (can get user by id if admin)', async () => {
//       await login();
//       if (token !== undefined) {
//         const res = await supertest(server).get(`/admin/users/${validId}`).send({token: token});
//         expect(res.statusCode).toBe(200);
//         expect(res.headers['content-type']).toBe(contentType);
//         expect(res.body.username).toBe('joe')
//       }
//     })
//
//     it('GET /admin/users/:id (get user by' +
//       ' id fails if id not valid, returns 400 and descriptive message)', async () => {
//       await login();
//       if (token !== undefined) {
//         const res = await
//           supertest(server).get(`/admin/users/${invalidId}`).send({
//             token:
//             token
//           });
//         expect(res.statusCode).toBe(400);
//         expect(res.headers['content-type']).toBe(contentType);
//         expect(res.body.message).toBe('Invalid user ID')
//       }
//     })
//
//
//     it('DELETE /admin/users/:id, (can not' +
//       ' delete a user by id if not admin)', async () => {
//       const res = await supertest(server).delete(`/admin/users/${validId}`);
//       expect(res.statusCode).toBe(401);
//       expect(res.headers['content-type']).toBe(contentType);
//       expect(res.body.message).toBe('missing required token')
//     })
//
//     it('DELETE /admin/users/:id (can delete a' +
//       ' user by id if admin)', async () => {
//       await login()
//       if (token !== undefined) {
//         const res = await supertest(server).delete(`/admin/users/${validId}`).send({token: token});
//         expect(res.statusCode).toBe(204);
//       }
//     })
//
//     it('DELETE /admin/users/:id (sends error if user id not found)', async () => {
//       await login();
//       if (token !== undefined) {
//         const res = await supertest(server).delete(`/admin/users/${invalidId}`).send({token: token});
//         expect(res.statusCode).toBe(400);
//         expect(res.headers['content-type']).toBe(contentType);
//         expect(res.body.message).toBe('Invalid user ID');
//       }
//     })
//   })
