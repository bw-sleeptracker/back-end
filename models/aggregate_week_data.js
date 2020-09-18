const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');


const create = async (monthLogId) => {
  // create new week data table
  const [weekLogId] = await db('aggregate_week_data').insert({
    id: uuidv4(),
    average_hours_slept: null,
    data: null,
    week: new Date(),
    aggregate_month_data_id: monthLogId
  },).returning('id')
  return weekLogId
}

module.exports = {
  create,
}
