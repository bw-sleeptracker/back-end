const faker = require('faker');

let goToSleep

const createTime=()=>{
    goToSleep = faker.time.recent();
}

const floodAggregate = () => ({

        id: faker.random.uuid(),
        date: faker.date.past(),
        bedtime: goToSleep,
        wake_time: goToSleep + 700000000000
    }
)

createTime()
console.log(floodAggregate())