const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');
const moment = require('moment')

/******************************************************************************
 *                      Get all week logs by user id
 ******************************************************************************/

const getAllByUserId = async (userId) => {
  return db("week_log").where('users_id', userId).orderBy("week_of_year", "desc");
}

/******************************************************************************
 *                      Get a week log by date query
 ******************************************************************************/

const getUsersLogByDate = async (id, date) => {
  return db("week_log")
    .where('users_id', id)
    .where('week_of_year', `${moment(date).week()}/2020`)
    .select('id',
      'week_of_year',
      'average_hours_slept',
      'average_quality');
}

/******************************************************************************
 *                      Check if a week log exists for specified week
 ******************************************************************************/

const checkIfWeekExists = async (userId, week_of_year) => {
  return db('week_log').where('users_id', userId).where('week_of_year', week_of_year);
}

/******************************************************************************
 *                      Get a week log by {key}
 ******************************************************************************/

const getBy = async (filter) => {
  return db("week_log").where(filter).orderBy("id");
}

/******************************************************************************
 *                      Create a new week log
 ******************************************************************************/

const create = async (userId) => {
  const week_of_year = `${moment().week()}/${moment().year()}`
  //create new week data table
  // check to see if week_of_year already exists for userId first
  const duplicate = await checkIfWeekExists(userId, week_of_year);
  let weekLogId
  if (duplicate.length === 0) {
    // if week log does not exist only create a new on on sundays
    if (moment().day() === 0) {
      [weekLogId] = await db('week_log').insert({
        id: uuidv4(),
        users_id: userId,
        week_of_year: `${moment().week()}/${moment().year()}`,
        average_hours_slept: 0,
        average_quality: 0,
      },).returning('id')
      console.log(weekLogId)
    }
  }
  return weekLogId;
}

/******************************************************************************
 *                      Update a week log
 ******************************************************************************/

const update = async (userId, dayData) => {
  const {sleptHours, avgQuality} = dayData
  // get current week avg hours slept and quality and avg in the new numbers
  const week_of_year = `${moment().week()}/${moment().year()}`
  const [log] = await db('week_log').where({week_of_year}).where('users_id', userId)
  const oldHours = log.average_hours_slept;
  const oldQuality = log.average_quality;
//  get day count of week for average
  let dayCount = (moment().day())
//  add todays entries plus old avgs divided by day count for new average
  let newHourAvg
  let newQuality
  // if weekly averages are null update them with todays averages
  if (oldHours === 0) {
    newHourAvg = sleptHours
  } else {
    newHourAvg = ((sleptHours + oldHours) / dayCount).toFixed(2)
  }
  if (oldQuality === 0) {
    newQuality = avgQuality
  } else {
    newQuality = ((avgQuality + oldQuality) / dayCount).toFixed(2)
  }
  // finally update the week log
  await db('week_log')
    .where({week_of_year})
    .where('users_id', userId)
    .update({
      average_hours_slept: newHourAvg,
      average_quality: newQuality
    }).select('id', 'week_of_year', 'average_hours_slept', 'average_quality')
  const [updatedLog] = await db('week_log').where({week_of_year}).where('users_id', userId)
  return updatedLog
}

/******************************************************************************
 *                      Export methods
 ******************************************************************************/

module.exports = {
  create,
  checkIfWeekExists,
  getBy,
  update,
  getAllByUserId,
  getUsersLogByDate,
}
