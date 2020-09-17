const faker = require('faker');

const floodAggregate = () => ({
        id: faker.random.uuid(),
        data: faker.random.number({min:1,max:4}),
        week: faker.date.past(),
    }
)

exports.seed = async function(knex, promise) {

    const fakerData = []
    const desiredFakeData = 10000
    for(let i = 0; i < desiredFakeData; i++){
        fakerData.push(floodAggregate());
    }
  // Deletes ALL existing entries
  await knex('aggregate_data').del()
  await knex('aggregate_data')
      .insert(fakerData)
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
