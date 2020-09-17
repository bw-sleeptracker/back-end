const faker = require('faker');

let sleepLogId

const floodQualityLog = () => ({
    id: faker.random.uuid(),
    wake_score: faker.random.number({min: 1, max: 4}),
    day_score: faker.random.number({min: 1, max: 4}),
    bedtime_score: faker.random.number({min: 1, max: 4}),
    sleep_log_id: sleepLogId
  }
)

exports.seed = async function (knex, promise) {

  const fakerData = []
  const desiredFakeData = 10000
  // getting a list of all sleep_log ids and aggregate_data ids
  const sleepLogsIds = await knex('sleep_log').select('id')
  for (let i = 0; i < desiredFakeData; i++) {
    // generating a random sleep log id each iteration
    sleepLogId = sleepLogsIds[Math.floor(Math.random() * sleepLogsIds.length) + 1]
    fakerData.push(floodQualityLog());
  }
  // Deletes ALL existing entries
  await knex('aggregate_data').del()
  await knex('aggregate_data')
    .insert(fakerData)
  await knex('aggregate_data')
    .insert([
      {
        id: '4f95d22e-21a5-4ee4-9e8a-b14479b36555',
        data: 4,
        week: new Date()
      },
      {
        id: '4f92d22e-20a5-4ee4-9e8a-b14479b36555',
        data: 2,
        week: new Date()
      },

    ])

};
