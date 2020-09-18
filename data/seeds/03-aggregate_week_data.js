const faker = require('faker');

exports.seed = async function (knex, promise) {
  await knex('aggregate_week_data').del()
  await knex('aggregate_week_data')
    .insert([
      {
        id: '4f95d22e-21a9-4ee4-9e8a-b14479b36555',
        aggregate_month_data_id: '4f95d22e-21a5-4ee4-9e8a-b14479b36555',
        average_hours_slept: 6,
        data: 4,
        week: new Date()
      },
      {
        id: '4f92d22e-20a9-4ee4-9e8a-b14479b36555',
        aggregate_month_data_id: '4f95d22e-21a5-4ee4-9e8a-b14479b36555',
        average_hours_slept: 7,
        data: 2,
        week: new Date()
      },

    ])
};
