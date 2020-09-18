const db = require('../data/dbConfig');
const {v4: uuidv4} = require('uuid');


const create = async () => {
  //create new month data table
  const [monthLogId] = await db('aggregate_month_data').insert({
    id: uuidv4(),
    average_hours_slept: null,
    data: null,
    month: new Date()
  },).returning('id')
  return monthLogId;
}

module.exports = {
  create,
}
