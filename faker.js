const faker = require('faker');
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



const floodAggregate = async () => {
  for (let i = 0; i < desiredFakeData; i++) {
    setTimeout(async () => {
      const agData = {
        id: faker.random.uuid(),
        data: faker.random.number({min: 1, max: 4}),
        week: faker.date.past(),

      }

      return db('aggregate_data')
        .insert(agData)
        .catch(err => log(err));
    }, 1000);
  }
}

let goToSleep
let wakeUp
let user
let data
const createTime = () => {
  goToSleep = faker.time.recent();
}


const floodSleepLog = async () => {
  // getting a list of all user ids and aggregate_data ids
  const users = await db('users').select('id')
  const dataIds = await db('aggregate_data').select('id')

  for (let i = 0; i < desiredFakeData; i++) {
    // generating a random user id and aggregate_data id each iteration
    user = users[Math.floor(Math.random() * users.length)];
    data = dataIds[Math.floor(Math.random() * dataIds.length)];

    createTime()
    if (goToSleep <= 1600308060888) {
      wakeUp = goToSleep + 700000000000;
    } else if (goToSleep >= 1600308060888) {
      wakeUp = goToSleep - 700000000000;
    }
    setTimeout(async () => {
      const sleepData = {
        id: faker.random.uuid(),
        date: faker.date.past(),
        bedtime: goToSleep,
        wake_time: wakeUp,
        average_quality: faker.random.number({min: 1, max: 4}),
        users_id: user.id,
        aggregate_data_id: data.id,
      }
      return db('sleep_log')
        .insert(sleepData)
        .catch(err => console.log(err));
    }, 1000);

  }
}


const floodQualityLog = async () => {
  // getting a list of all user ids and aggregate_data ids
  const sleepLogIds = await db('sleep_log').select('id')
  for (let i = 0; i < desiredFakeData; i++) {
    // generating a random user id and aggregate_data id each iteration
    sleepId = sleepLogIds[Math.floor(Math.random() * sleepLogIds.length)];

    setTimeout(async () => {
      const qualityData = {
        id: faker.random.uuid(),
        wake_score: faker.random.number({min: 1, max: 4}),
        day_score: faker.random.number({min: 1, max: 4}),
        bedtime_score: faker.random.number({min: 1, max: 4}),
        sleep_log_id: sleepId.id
      }
      return db('quality_log')
        .insert(qualityData)
        .catch(err => console.log(err));
    }, 1000);

  }
}
floodQualityLog()



