const express = require('express');
const router = express.Router();
const moment = require('moment')

const sleepModel = require('../models/day_log');
const qualityModel = require('../models/quality_log');
const weekModel = require('../models/week_log');
const monthModel = require('../models/month_log');
const usersModel = require('../models/users');
const validateToken = require('../auth/validateToken');
const validateUserId = require('../middleware/validateUserId');
const validateAdmin = require('../auth/validateAdmin');
const validateBody = require('../middleware/validateUserUpdateBody');

/******************************************************************************
 *                      Get all current users month logs - "GET
 *                      /month/all/current-user"
 ******************************************************************************/

router.get('/current-user', async (req, res, next) => {
  try {
    const logs = await monthModel.getAllByUserId(req.id)
    res.status(200).json(logs)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})

/******************************************************************************
 *                      Get a users month log by date query - "GET
 *                      /week/search/?date={'01-25-2000'}"
 ******************************************************************************/

router.get('/current-user/search', async (req, res, next) => {
const month = (moment(req.query.date).month() + 1)
  const year = req.query.date.substring(req.query.date.length - 4)
  try {
    const log = await monthModel.getUsersLogByDate(req.id, month, year)
    res.status(200).json(log)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

module.exports = router;
