const express = require('express');
const router = express.Router();
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
 *                      /month/current-user"
 ******************************************************************************/

router.get('/all/current-user', async (req, res, next) => {
  try {
    const logs = await monthModel.getAllByUserId(req.id)
    res.status(200).json(logs)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})
/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

module.exports = router;
