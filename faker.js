const faker = require('faker');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const db = require('./data/dbConfig');


const floodUsers = async () => {
  for (let i = 0; i < 20; i++) {
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

let month = 1
let day = 0

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
const longMonths = [1, 3, 5, 7, 8, 10, 12]
const shortMonths = [4, 6, 9, 11]

const floodDays = async (id) => {
  //flood my days
  month = 7
  day = 0
  for (let i = 0; i < 61; i++) {
    const sleepId = faker.random.uuid()
    if (month === 2) {
      if (day < 28) {
        day++
      } else {
        day = 1
        month++
      }
    } else if (shortMonths.includes(month)) {
      if (day < 30) {
        day++
      } else {
        day = 1
        month++
      }
    } else if (longMonths.includes(month)) {
      if (day < 31) {
        day++
      } else {
        day = 1
        if (month !== 12) {
          month++
        } else {
          month = 1
        }
      }
    }
      const sleepData = {
        id: sleepId,
        users_id: id,
        date: `2020-${month}-${day}`,
        bedtime: `23:00:00`,
        wake_time: `06:00:00`,
        total_hours_slept: 7,
        average_quality: 3,
      }
      const qualityData = {
        id: faker.random.uuid(),
        wake_score: 3,
        day_score: 3,
        bedtime_score: 3,
        day_log_id: sleepId
      }
    setTimeout(async () => {
      // console.log({sleepData})
      // console.log({qualityData})
      await db('day_log')
        .insert(sleepData)
        .catch(err => console.log(err));
      await db('quality_log')
        .insert(qualityData)
        .catch(err => console.log(err));
    }, 1000);
  }
}
const floodMonths = async (id) => {
//flood my months
  for (let i = 7; i < 9; i++) {
    setTimeout(async () => {
      const agData = {
        id: faker.random.uuid(),
        users_id: id,
        month_of_year: `${i}/2020`,
        average_hours_slept: 7,
        average_quality: 3,
      }
      return db('month_log')
        .insert(agData)
        .catch(err => console.log(err));
    }, 1000);
  }
}
const floodWeeks = async (id) => {
//flood my weeks
  for (let i = 27; i < 37; i++) {
    setTimeout(async () => {
      const agData = {
        id: faker.random.uuid(),
        users_id: id,
        week_of_year: `${i}/2020`,
        average_hours_slept: 7,
        average_quality: 3,
      }
      return db('week_log')
        .insert(agData)
        .catch(err => console.log(err));
    }, 1000);
  }
}
const floodAdminsData = () => {
  adminIds.map(id => {
floodDays(id)
floodWeeks(id)
floodMonths(id)
  })
}
const adminIds = ['1dd68a45-de2c-49f9-8b32-c7ca3f08792b',
'f8768319-2572-4915-958d-10c4f0460cee',
'e78e2128-f21e-414e-bf7c-1547480db0c1',
'af0f2387-c97b-4778-a399-b088450790a3',
'fc79387d-5ff0-4f3f-b0e9-49bcac97e806',
'655b3e68-2d9b-4041-a197-705b393baec1',
]
// floodUsers()
// createAdmins()
// floodAdminsData()


// get week number by date
// console.log(moment('1-25-1995').month() + 1 )

// console.log(moment().date())
// console.log(moment('8-30-2020').week())
// console.log(faker.date.past())
