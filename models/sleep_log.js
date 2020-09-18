const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');



const create = async (userId, bedtime) => {
    // creating a basic sleep log when user creates a new bedtime
    logData = {
        id: uuidv4(),
        users_id: userId,
        bedtime: bedtime,
        date: new Date(),
        wake_time: null,
        total_hours_slept: null,
        average_quality: null,
    }
    console.log(logData)
    // const log = await db('sleep_log').insert(logData)
    // console.log({log});
}

const getById = async (id) => {
    return db('sleep_log').where({id}).select('id', 'username', 'admin', 'email')
}

module.exports = {
    getById,
    create,
}
