const monthModel = require('../models/month_log')
const moment = require("moment");
const db = require('../data/dbConfig');

/******************************************************************************
 *                      Calculates monthly sleep quality
 ******************************************************************************/


const calculateAverageQuality = (months) =>{
    let qualityTotal = 0;
    months.map(userMonth =>{
        qualityTotal += userMonth.average_quality
    })
    return {qualityTotal: qualityTotal,
        totalMonths: months.length,
        averageQuality: qualityTotal / months.length
    }
}


module.exports = {
    calculateAverageQuality,

}