const faker = require('faker');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const db = require('./data/dbConfig');

const desiredFakeData = 100

const floodUsers = async () => {
  for (let i = 0; i < desiredFakeData; i++) {
    setTimeout(async () => {
      const userData = {
        id: faker.random.uuid(),
        username: faker.name.firstName() + faker.random.number(),
        password: faker.internet.password(),
        email: faker.internet.email(),
      }

      return db('users')
        .insert(userData)
        .catch(err => log(err));
    }, 1000);
  }
}

const floodMonthLog = async () => {
  const users = await db('users').select('id')
    user = users[Math.floor(Math.random() * users.length)];
  for (let i = 0; i < 12; i++) {
    setTimeout(async () => {
      const agData = {
        id: faker.random.uuid(),
        users_id: user.id,
        month_of_year: `${i + 1}/2020`,
        average_hours_slept: faker.random.number({min: 5, max: 10}),
        average_quality: faker.random.number({min: 1, max: 4}),
      }
      return db('month_log')
        .insert(agData)
        .catch(err => console.log(err));
    }, 1000);
  }
}

const floodWeekLog = async () => {
  const users = await db('users').select('id')
    user = users[Math.floor(Math.random() * users.length)];
  for (let i = 0; i < 52; i++) {
    setTimeout(async () => {
      const agData = {
        id: faker.random.uuid(),
        users_id: user.id,
        week_of_year: `${i + 1}/2020`,
        average_hours_slept: faker.random.number({min: 5, max: 10}),
        average_quality: faker.random.number({min: 1, max: 4}),
      }
      return db('week_log')
        .insert(agData)
        .catch(err => log(err));
    }, 1000);
  }
}

let user
let month = 4
let day = 1


const floodDayLog = async () => {
  // getting a list of all user ids and aggregate_data ids
  const users = await db('users').select('id')

  for (let i = 0; i < desiredFakeData; i++) {
    if (day < 30) {
      day++
    } else if (day === 30) {
      day = 1
      if (month < 11) {
        month++
      } else if (month === 11) {
        month = 1
      }
    }
    const bedtime = moment({
      year: '2020',
      month: month,
      day: day,
      hours: '22',
      minutes: '00',
      seconds: '0'
    }).format("YYYY-MM-DD hh:mm:ss");
    const wakeTime = moment({
      year: '2020',
      month: month,
      day: day + 1,
      hours: '6',
      minutes: '00',
      seconds: '0'
    }).format("YYYY-MM-DD hh:mm:ss")

    // generating a random user id and aggregate_data id each iteration
    user = users[Math.floor(Math.random() * users.length)];

    setTimeout(async () => {
      const sleepData = {
        id: faker.random.uuid(),
        users_id: user.id,
        date: faker.date.past(),
        bedtime: bedtime,
        wake_time: wakeTime,
        total_hours_slept: 8,
        average_quality: faker.random.number({min: 1, max: 4}),
      }
      return db('day_log')
        .insert(sleepData)
        .catch(err => console.log(err));
    }, 1000);

  }
}

const floodQualityLog = async () => {
  // getting a list of all user ids and aggregate_data ids
  const sleepLogIds = await db('day_log').select('id')
  for (let i = 0; i < desiredFakeData; i++) {
    // generating a random user id and aggregate_data id each iteration
    sleepId = sleepLogIds[Math.floor(Math.random() * sleepLogIds.length)];
    setTimeout(async () => {
      const qualityData = {
        id: faker.random.uuid(),
        wake_score: faker.random.number({min: 1, max: 4}),
        day_score: faker.random.number({min: 1, max: 4}),
        bedtime_score: faker.random.number({min: 1, max: 4}),
        day_log_id: sleepId.id
      }
      return db('quality_log')
        .insert(qualityData)
        .catch(err => console.log(err));
    }, 1000);
  }
}
const createAdmins = async () => {
  const admins = [
    {
      admin: true,
      email: 'jess@email.com',
      username: 'Jess',
      password: 'unit4',
    },
    {
      admin: true,
      email: 'Daniel',
      username: 'daniel@email.com',
      password: 'unit4',
    },
    {
      admin: true,
      email: 'kevin@email.com',
      username: 'Kevin',
      password: 'unit3',
    },
    {
      admin: true,
      email: 'kasi@email.com',
      username: 'Kasi',
      password: 'unit3',
    },
    {
      admin: true,
      email: 'tom@email.com',
      username: 'Tom',
      password: 'unit2',
    },
    {
      admin: true,
      email: 'seth@email.com',
      username: 'Seth',
      password: 'unit1',
    },

  ]
  admins.map(admin => {
    setTimeout(async () => {
      const hash = bcrypt.hashSync(admin.password, 10);
      admin.password = hash;
      admin.id = uuidv4();
      return db('users')
        .insert(admin)
        .catch(err => console.log(err));
    }, 1000);
  })
}
// floodUsers()
// floodMonthLog()
// floodWeekLog()
// floodDayLog()
// floodQualityLog()
// createAdmins()

// get week number by date
// console.log(moment('1-25-1995').week())

