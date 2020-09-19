const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');
const moment = require('moment')

const create = async (userId) => {
  const week_of_year = `${moment().week()}/${moment().year()}`
  //create new week data table
  // check to see if week_of_year already exists for userId first
  const duplicate = await checkDuplicateWeek(userId, week_of_year);
  let weekLogId
  if (duplicate.length === 0) {
   [weekLogId] = await db('week_log').insert({
    id: uuidv4(),
    users_id: userId,
    week_of_year: `${moment().week()}/${moment().year()}`,
    average_hours_slept: null,
    average_quality: null,
  },).returning('id')
    console.log(weekLogId)
  }
  return weekLogId;
}
const checkDuplicateWeek = async (userId, week_of_year) => {
  // console.log({week_of_year})
  return db('week_log').where('users_id', userId).where('week_of_year', week_of_year);
}

const getBy = async (filter) => {
  return db("week_log").where(filter).orderBy("id");
}


module.exports = {
  create,
  checkDuplicateWeek,
  getBy,
}
