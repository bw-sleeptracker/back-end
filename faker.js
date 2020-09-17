const faker = require('faker');
const db = require('./data/dbConfig');

let goToSleep
let wakeUp
let user
let data
const createTime = () => {
  goToSleep = faker.time.recent();
}

const floodSleepLog = async () => {
  const fakerLog = []
  const desiredFakeData = 10;
  // getting a list of all user ids and aggregate_data ids
  const users = await db('users').select('id')
  const dataIds = await db('aggregate_data').select('id')


  for (let i = 0; i < desiredFakeData; i++) {
    // generating a random user id and aggregate_data id each iteration
    user = users[Math.floor(Math.random() * users.length) + 1];
    data = dataIds[Math.floor(Math.random() * dataIds.length) + 1];

    createTime()
    if (goToSleep <= 1600308060888) {
      wakeUp = goToSleep + 700000000000;
    } else if (goToSleep >= 1600308060888) {
      wakeUp = goToSleep - 700000000000;
    }
    const inserted = {
      id: faker.random.uuid(),
      date: faker.date.past(),
      bedtime: goToSleep,
      wake_time: wakeUp,
      average_quality: faker.random.number({min: 1, max: 4}),
      users_id: user.id,
      aggregate_data_id: data.id,
    }
    console.log(inserted)
  }
}

floodSleepLog()


