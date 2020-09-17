const faker = require('faker');
const db = require('../dbConfig')

let sleepLogId

const floodQualityLog = () => ({
    id: faker.random.uuid(),
    wake_score: faker.random.number({min: 1, max: 4}),
    day_score: faker.random.number({min: 1, max: 4}),
    bedtime_score: faker.random.number({min: 1, max: 4}),
    sleep_log_id: sleepLogId.id
  }
)

exports.seed = async function (knex, promise) {

  const fakerData = []
  const desiredFakeData = 100
  // getting a list of all sleep_log ids and aggregate_data ids
  const sleepLogIds = await db('sleep_log').select('id')

    console.log({sleepLogIds})
  await knex('quality_log').del()
  for (let i = 0; i < desiredFakeData; i++) {
    // generating a random sleep log id each iteration
    sleepLogId = sleepLogIds[Math.floor(Math.random() * sleepLogIds.length) + 1];
    // fakerData.push(floodQualityLog());
  console.log(sleepLogId)
  await knex('quality_log')
    .insert({
      id: faker.random.uuid(),
      wake_score: faker.random.number({min: 1, max: 4}),
      day_score: faker.random.number({min: 1, max: 4}),
      bedtime_score: faker.random.number({min: 1, max: 4}),
      sleep_log_id: sleepLogId.id
    })
  }

  // Deletes ALL existing entries
  // await knex('quality_log').del()
  // await knex('quality_log')
  //   .insert(fakerData)``
  await knex('quality_log')
    .insert([
      {
        id: '4f95d22e-21a5-4ee4-9e8a-b14479b36555',
        wake_score: 2,
        day_score: 4,
        bedtime_score: 1,
        sleep_log_id: '2c56584b-aad7-48c6-a85d-4b57d093bc0f',
      },
      {
        id: '4f92d22e-20a5-4ee4-9e8a-b14479b36555',
        wake_score: 2,
        day_score: 3,
        bedtime_score: 1,
        sleep_log_id: '2c56584b-aad7-48c6-a84d-4b57d093bc0f',
      },

    ])

};
