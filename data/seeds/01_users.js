exports.seed = async function (knex, Promise) {
  await knex('users').del();
  await knex('users')
    .insert([{
      id: '4f95d22e-21a9-4ee4-9e9a-b14479b36555',
      username: 'admin',
      password: 'password',
      email: 'admin@admin.com',
      recommended_hours: 8,
      admin: true,
    },
      {
        id: '4f95d22e-21a9-4ee4-9e9a-b14479b36556',
        username: 'joe',
        password: 'password',
        email: 'joe@joe.com',
        recommended_hours: 8,
        admin: true,
      }
    ])
};
