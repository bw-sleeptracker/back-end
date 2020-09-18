const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');
const monthModel = require('./aggregate_month_data')
const weekModel = require('./aggregate_week_data')


const create = async (userId, bedtime) => {
  // creating a basic sleep log when user creates a new bedtime
  logData = {
    id: uuidv4(),
    users_id: userId,
    bedtime: bedtime,
    date: new Date(),
    wake_time: null,
    total_hours_slept: null,
    average_quality: 0,
  }
  //create new month data table
  const monthLogId = await monthModel.create();
  // TODO move this into agg week model
  // create new week data table
  const weekLogId = await weekModel.create(monthLogId);
  const [logId] = await db('sleep_log').insert({
    ...logData,
    aggregate_week_data_id: weekLogId
  }).returning('id')
  return logId
}

const getById = async (id) => {
  return db('sleep_log').where({id}).select(
    'id',
    'bedtime',
    'date',
    'wake_time',
    'total_hours_slept',
    'average_quality',
  )
}

module.exports = {
  getById,
  create,
}
