const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');
const moment = require('moment')

const create = async (userId) => {
  const month_of_year = `${moment().month()}/${moment().year()}`
  //create new month data table
  // check to see if month_of_year already exists for userId first
  const duplicate = await checkDuplicateMonth(userId, month_of_year);
  let monthLogId
  if (duplicate.length === 0) {
    // if month log does not exist only create a new on on first day of month
    if (moment().date() === 1) {
      [monthLogId] = await db('month_log').insert({
        id: uuidv4(),
        users_id: userId,
        month_of_year: `${moment().month()}/${moment().year()}`,
        average_hours_slept: null,
        average_quality: null,
      },).returning('id')
      console.log(monthLogId)
    }
  }
  return monthLogId;
}
const checkIfMonthExists = async (userId, month_of_year) => {
  // console.log({month_of_year})
  return db('month_log').where('users_id', userId).where('month_of_year', month_of_year);
}

const getBy = async (filter) => {
  return db("month_log").where(filter).orderBy("id");
}

const update = async (userId, dayData) => {
  const {sleptHours, avgQuality} = dayData
  // get current month avg hours slept and quality and avg in the new numbers
  const month_of_year = `${moment().month() + 1}/${moment().year()}`
  const [log] = await db('month_log').where({month_of_year}).where('users_id', userId)
  const oldHours = log.average_hours_slept;
  const oldQuality = log.average_quality;
//  get day count of month days for average
  let dayCount = (moment().date())
//  add todays entries plus old avgs divided by day count for new average
  let newHourAvg = ((sleptHours + oldHours) / dayCount).toFixed(2)
  let newQuality = ((avgQuality + oldQuality) / dayCount).toFixed(2)
  // finally update the month log
  await db('month_log')
    .where({month_of_year})
    .where('users_id', userId)
    .update({
      average_hours_slept: newHourAvg,
      average_quality: newQuality
    }).select('id', 'month_of_year', 'average_hours_slept', 'average_quality')
  const [updatedLog] = await db('month_log').where({month_of_year}).where('users_id', userId)
  return updatedLog
}


module.exports = {
  create,
  checkIfMonthExists,
  getBy,
  update,
}
