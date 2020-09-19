const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');
const monthModel = require('./month_log')
const weekModel = require('./week_log')
const qualityModel = require('./quality_log')


const create = async (userId, bedtime) => {
  // creating a basic sleep log when user creates a new bedtime
  logData = {
    id: uuidv4(),
    users_id: userId,
    date: new Date(),
    bedtime: bedtime,
    wake_time: null,
    total_hours_slept: null,
    average_quality: 0,
  }
  //  check if month and week logs already made and create them if not
  const monthLogId = await monthModel.create(userId);
  const weekLogId = await weekModel.create(userId);
  const [logId] = await db('day_log').insert(logData).returning('id')
  const qualityLogId = await qualityModel.create(logId);
  return logId
}

// helper functions for updating
const getSleptHours = (bedtime, wakeTime) => {
  const time1 = new Date(bedtime)
  const time2 = new Date(wakeTime)
  let sleepDifference = Math.abs(time1.getTime() - time2.getTime())
  sleepDifference = sleepDifference / (1000 * 60 * 60);
  return (sleepDifference * 100) / 100
}
const getAverageQualityForOneDay = (wakeScore, dayScore, bedScore) => {
  return ((wakeScore + dayScore + bedScore) / 3)
}


const update = async (id, sleepData) => {
  let logUpdate = {
    wake_time: sleepData.wake_time,
    bed_time: sleepData.bedtime || undefined,
  }
  // first update the wake_time
  await db('day_log').where({id}).update(logUpdate)
  // next update the quality scores
  // get current quality values
  let [currentQuality] = await qualityModel.getByDayLogId(id)
  // if no value provided use old values
  let qualityUpdate = {
    wake_score: sleepData.wake_score || currentQuality.wake_score,
    day_score: sleepData.day_score || currentQuality.day_score,
    bedtime_score: sleepData.bedtime_score || currentQuality.bedtime_score
  }
  // update the scores
  await qualityModel.update(id, qualityUpdate)
  const [qualityLog] = await qualityModel.getByDayLogId(id)
  // then get the newly formatted bedtime and wake_time
  const [sleepLog] = await getById(id)
  //then calculate hours slept with helper function and properly formatted times
  const sleptHours = getSleptHours(sleepLog.bedtime, sleepLog.wake_time)
  // update with hours slept
  logUpdate = {
    total_hours_slept: sleptHours,
  }
  await db('day_log').where({id}).update(logUpdate)
  // if all scores are inputted calculate the average quality score
  if (qualityLog.wake_score !== 0 && qualityLog.day_score !== 0 && qualityLog.bedtime_score !== 0) {
    const averageQualityScore = getAverageQualityForOneDay(qualityLog.wake_score, qualityLog.day_score, qualityLog.bedtime_score)
    // update the average score
    logUpdate = {
      average_quality: averageQualityScore,
    }
    await db('day_log').where({id}).update(logUpdate)
  }
  // return all the data from sleep log and quality log
  const [completeLog] = await db('day_log as d')
    .where('d.id', id)
    .join('quality_log as q', 'q.day_log_id', 'd.id')
    .select('d.id', 'd.date', 'd.bedtime', 'd.wake_time', 'd.total_hours_slept', 'd.average_quality', 'q.wake_score', 'q.day_score', 'q.bedtime_score')
  return completeLog
}

const getAllByUserId = async (id) => {
  const allLogs = await db('day_log as d')
    .where('d.users_id', id)
    .join('quality_log as q', 'q.day_log_id', 'd.id')
    .select('d.id', 'd.date', 'd.bedtime', 'd.wake_time', 'd.total_hours_slept', 'd.average_quality', 'q.wake_score', 'q.day_score', 'q.bedtime_score')
    .orderBy('d.date', 'desc')
  return allLogs
}

const getLatestByUserId = async (id) => {
  const log = await db('day_log as d')
    .where('d.users_id', id)
    .join('quality_log as q', 'q.day_log_id', 'd.id')
    .select('d.id', 'd.date', 'd.bedtime', 'd.wake_time', 'd.total_hours_slept', 'd.average_quality', 'q.wake_score', 'q.day_score', 'q.bedtime_score')
    .orderBy('d.date', 'desc').first()
  return log
}

const getById = async (id) => {
  return db('day_log').where({id}).select(
    'id',
    'bedtime',
    'date',
    'wake_time',
    'total_hours_slept',
    'average_quality',
  )
}

const getByDate = async (id, date) => {
  const log = await db('day_log as d')
    .where('d.users_id', id)
    .where('d.date', date)
    .join('quality_log as q', 'q.day_log_id', 'd.id')
    .select('d.id', 'd.date', 'd.bedtime', 'd.wake_time', 'd.total_hours_slept', 'd.average_quality', 'q.wake_score', 'q.day_score', 'q.bedtime_score')
    .orderBy('d.date', 'desc').first()
  return log
}

const remove = async (id) => {
  await db('quality_log').where('day_log_id', id).delete()
  return db('day_log').where({id}).delete()
}


module.exports = {
  getById,
  create,
  update,
  getAllByUserId,
  getLatestByUserId,
  getByDate,
  remove,
}
