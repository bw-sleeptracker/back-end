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
   [monthLogId] = await db('month_log').insert({
    id: uuidv4(),
    users_id: userId,
    month_of_year: `${moment().month()}/${moment().year()}`,
    average_hours_slept: null,
    average_quality: null,
  },).returning('id')
    console.log(monthLogId)
  }
  return monthLogId;
}
const checkDuplicateMonth = async (userId, month_of_year) => {
  // console.log({month_of_year})
  return db('month_log').where('users_id', userId).where('month_of_year', month_of_year);
}

const getBy = async (filter) => {
  return db("month_log").where(filter).orderBy("id");
}


module.exports = {
  create,
  checkDuplicateMonth,
  getBy,
}
