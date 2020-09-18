const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');


const create = async (sleepLogId) => {
  //create new month data table
  const [qualityLogId] = await db('quality_log').insert({
    id: uuidv4(),
    wake_score: 0,
    day_score: 0,
    bedtime_score: 0,
    sleep_log_id: sleepLogId
  },).returning('id')
  return qualityLogId;
}

const update = async (sleepLogId, qualityData) => {
  return db('quality_log').where('sleep_log_id',  sleepLogId).update(qualityData)
}

const getBySleepLogId = async (id) => {
  return  db('quality_log').where('sleep_log_id',  id).select(
    'id',
    'wake_score',
    'day_score',
    'bedtime_score',
    'sleep_log_id',
  )
}

module.exports = {
  create,
  getBySleepLogId,
  update
}
