const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');
const moment = require('moment')

const create = async (userId) => {
  // create new week data table
  const [weekLogId] = await db('week_log').insert({
    id: uuidv4(),
    users_id: userId,
    week_of_year: `${moment().week()}/${moment().year()}`,
    average_hours_slept: null,
    average_quality: null,
  },).returning('id')
  return weekLogId
}

module.exports = {
  create,
}
