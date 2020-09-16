const faker = require('faker');

const createFakeUser = () => ({
    id: faker.random.uuid(),
    username: faker.name.firstName() + faker.random.number(),
    password: faker.internet.password(),
  }
)

exports.seed = async function (knex, Promise) {
  const fakeUsers = []
  const desiredFakeUsers = 100
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser());
  }
  await knex('users').del();
  await knex('users')
    .insert(fakeUsers)
  await knex('users')
    .insert([{
      id: '4f95d22e-21a9-4ee4-9e9a-b14479b36555',
      username: 'jess-admin',
      password: 'password',
      admin: true,
    },
      {
        id: '4f95d22e-21a9-4ee4-9e9a-b14479b36556',
        username: 'jess',
        password: 'password',
        admin: true,
      }
    ])
};
