const faker = require('faker');

exports.seed = async function (knex, promise) {
  await knex('month_log').del()
  await knex('month_log')
    .insert([
      {
        id: '5f95d22e-21a5-4ee4-9e8a-b14479b36555',
        users_id: '4f95d22e-21a9-4ee4-9e9a-b14479b36555',
        month_of_year: '1/2020',
        average_hours_slept: 7,
        average_quality: 4,
      },
      {
        id: '1f92d22e-20a5-4ee4-9e8a-b14479b36555',
        users_id: '4f95d22e-21a9-4ee4-9e9a-b14479b36556',
        month_of_year: '2/2020',
        average_hours_slept: 7,
        average_quality: 4,
      },
    ])
};
