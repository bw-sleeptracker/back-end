exports.seed = async function (knex, promise) {
  await knex('quality_log').del()
  await knex('quality_log')
    .insert([
      {
        id: '4f95d22e-21a5-4ee4-9e8a-b14479b36555',
        day_log_id: '2c56584b-aad7-48c6-a85d-4b57d093bc0f',
        wake_score: 2,
        day_score: 4,
        bedtime_score: 1,
      },
      {
        id: '4f92d22e-20a5-4ee4-9e8a-b14479b36555',
        day_log_id: '2c56584b-aad7-48c6-a84d-4b57d093bc0f',
        wake_score: 2,
        day_score: 3,
        bedtime_score: 1,
      },
    ])

};
