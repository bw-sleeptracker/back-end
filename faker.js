const faker = require('faker');

const createFakeUser = () => ({
    id: faker.random.uuid(),
    username: faker.name.firstName() + faker.random.number(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  }
)

const fakeUsers = []
  const desiredFakeUsers = 100
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser());
  }
