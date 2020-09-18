const faker = require('faker');

exports.seed = async function(knex, promise) {
  await knex('aggregate_data').del()
    await knex('aggregate_data')
        .insert([
            {
            id: '4f95d22e-21a5-4ee4-9e8a-b14479b36555',
            data:4,
            week: new Date()
        },
            {
                id: '4f92d22e-20a5-4ee4-9e8a-b14479b36555',
                data:2,
                week: new Date()
            },

        ])
};
