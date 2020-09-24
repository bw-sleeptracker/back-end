const Jest = require("jest");
const helper = require('../helpers/helper')
const supertest = require("supertest");
const db = require('../data/dbConfig');
const monthModels = require("../models/month_log");
const server = require('../index');
const monthRouter = require('../routes/month_log')
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


beforeEach(async () => {
    await db.migrate.latest();
    return db.seed.run();
});
// * closes any database connections after the tests in case it stays open
afterAll(async () => {
    await db.destroy();
});


describe("Tests correct average returning for all current months of user", () =>{
    it("Check quality of all months.", async ()=>{
        await login();
        let res = await supertest(server).get('/month/current-user/average')
        expect(res.statusCode).toBe(200)

    })
})

