const faker = require('faker');

let goToSleep
let wakeUp
let user
let data
const createTime = () => {
  goToSleep = faker.time();
}

const floodSleepLog = () => ({

    id: faker.random.uuid(),
    date: faker.date.past(),
    bedtime: goToSleep,
    wake_time: wakeUp,
    average_quality: faker.random.number({min: 1, max: 4}),
    users_id: user,
    aggregate_data_id: data,
  }
)

exports.seed = async function (knex, promise) {
  const fakerLog = []
  const desiredFakeData = 1000;
  // getting a list of all user ids and aggregate_data ids
  const users = await knex('users').select('id')
  const dataIds = await knex('aggregate_data').select('id')

  for (let i = 0; i < desiredFakeData; i++) {
    // generating a random user id each iteration
    user = users[Math.floor(Math.random() * users.length) + 1];

    createTime()
    if (goToSleep <= 1600308060888) {
      wakeUp = goToSleep + 700000000000;
    } else if (goToSleep >= 1600308060888) {
      wakeUp = goToSleep - 700000000000;
    }
    fakerLog.push(floodSleepLog())
  }
  // Deletes ALL existing entries
  await knex('sleep_log').del()
  await knex('sleep_log')
    .insert(fakerLog)
  await knex('sleep_log')
    .insert([
      {
        id: '2c56584b-aad7-48c6-a85d-4b57d093bc0f',
        date: new Date(),
        bedtime: 2300308060888,
        wake_time: 7000000608880,
        average_quality: 4,
        users_id: '4f95d22e-21a9-4ee4-9e9a-b14479b36555',
        aggregate_data_id: '4f95d22e-21a5-4ee4-9e8a-b14479b36555'

      },
      {
        id: '2c56584b-aad7-48c6-a84d-4b57d093bc0f',
        date: new Date(),
        bedtime: 2300308060888,
        wake_time: 7000000608880,
        average_quality: 1,
        users_id: '4f95d22e-21a9-4ee4-9e9a-b14479b36556',
        aggregate_data_id: '4f92d22e-20a5-4ee4-9e8a-b14479b36555'

      },

    ])
}