const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');

/******************************************************************************
 *                      Create a new quality log
 ******************************************************************************/

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

/******************************************************************************
 *                      Update a quality log
 ******************************************************************************/

const update = async (dayLogId, qualityData) => {
  return db('quality_log').where('day_log_id',  dayLogId).update(qualityData)
}

/******************************************************************************
 *                      Get a quality log by day log id
 ******************************************************************************/

const getByDayLogId = async (id) => {
  return  db('quality_log').where('day_log_id',  id).select(
    'id',
    'wake_score',
    'day_score',
    'bedtime_score',
    'day_log_id',
  )
}

/******************************************************************************
 *                      Export methods
 ******************************************************************************/

module.exports = {
  create,
  getByDayLogId,
  update
}
