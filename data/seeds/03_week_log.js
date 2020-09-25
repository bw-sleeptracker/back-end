const faker = require('faker');

exports.seed = async function (knex, promise) {
  await knex('week_log').del()
  await knex('week_log')
    .insert([
      {
        id: '4f95d22e-21a9-4ee4-9e8a-b14479b36555',
        users_id: '4f95d22e-21a9-4ee4-9e9a-b14479b36555',
        week_of_year: '21/2020',
        average_hours_slept: 7,
        average_quality: 4,
      },
      {
        id: '4f92d22e-20a9-4ee4-9e8a-b14479b36555',
        users_id: '4f95d22e-21a9-4ee4-9e9a-b14479b36556',
        week_of_year: '13/2020',
        average_hours_slept: 7,
        average_quality: 4,
      },

    ])
};
