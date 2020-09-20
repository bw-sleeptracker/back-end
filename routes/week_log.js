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
 *                      Get all current users week logs - "GET
 *                      /week/all/current-user"
 ******************************************************************************/

router.get('/current-user', async (req, res, next) => {
  try {
    const logs = await weekModel.getAllByUserId(req.id)
    res.status(200).json(logs)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})

/******************************************************************************
 *                      Get a users week log by date query - "GET
 *                      /week/search/?date={'1-25-2000'}"
 ******************************************************************************/

router.get('/current-user/search', async (req, res, next) => {
  const date = req.query.date
  try {
    const log = await weekModel.getUsersLogByDate(req.id, date)
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
