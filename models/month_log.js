const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');
const moment = require('moment');


const create = async (userId) => {
  //create new month data table
  const [monthLogId] = await db('month_log').insert({
    id: uuidv4(),
    users_id: userId,
    month_of_year: `${moment().month() + 1}/${moment().year()}`,
    average_hours_slept: null,
    average_quality: null,
  },).returning('id')
  return monthLogId;
}

module.exports = {
  create,
}
