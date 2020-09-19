const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');


const create = async (dayLogId) => {
  //create new month data table
  const [qualityLogId] = await db('quality_log').insert({
    id: uuidv4(),
    day_log_id: dayLogId,
    wake_score: 0,
    day_score: 0,
    bedtime_score: 0,
  },).returning('id')
  return qualityLogId;
}

const update = async (dayLogId, qualityData) => {
  return db('quality_log').where('day_log_id',  dayLogId).update(qualityData)
}

const getByDayLogId = async (id) => {
  return  db('quality_log').where('day_log_id',  id).select(
    'id',
    'wake_score',
    'day_score',
    'bedtime_score',
    'day_log_id',
  )
}

module.exports = {
  create,
  getByDayLogId,
  update
}
