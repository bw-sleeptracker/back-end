const faker = require('faker');

exports.seed = async function (knex, promise) {
  await knex('sleep_log').del()
  await knex('sleep_log')
    .insert([
      {
        id: '2c56584b-aad7-48c6-a85d-4b57d093bc0f',
        date: new Date(),
        bedtime: 2300000000000,
        wake_time: 700000000000,
        total_hours_slept: 8,
        average_quality: 4,
        users_id: '4f95d22e-21a9-4ee4-9e9a-b14479b36555',
        aggregate_week_data_id: '4f95d22e-21a5-4ee4-9e8a-b14479b36555'

      },
      {
        id: '2c56584b-aad7-48c6-a84d-4b57d093bc0f',
        date: new Date(),
        bedtime: 2300000000000,
        wake_time: 700000000000,
        total_hours_slept: 8,
        average_quality: 1,
        users_id: '4f95d22e-21a9-4ee4-9e9a-b14479b36556',
        aggregate_week_data_id: '4f92d22e-20a5-4ee4-9e8a-b14479b36555'
      },
    ])
}
