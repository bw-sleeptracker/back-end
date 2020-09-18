const express = require('express');
const router = express.Router();
const sleepModel = require('../models/sleep_log');
const qualityModel = require('../models/quality_log');
const weekModel = require('../models/aggregate_week_data');
const monthModel = require('../models/aggregate_month_data');
const usersModel = require('../models/users');
const validateToken = require('../auth/validateToken');
const validateUserId = require('../middleware/validateUserId');
const validateAdmin = require('../auth/validateAdmin');
const validateBody = require('../middleware/validateBody');


/******************************************************************************
 *                      Create sleep_log by userId - "POST
 *                      /sleep/current-user"
 ******************************************************************************/

router.post('/current-user', async (req, res, next) => {
  const {bedtime} = req.body;
  try {
    const sleepLogId = await sleepModel.create(req.id, bedtime)
    const [log] = await sleepModel.getById(sleepLogId)
    console.log({log})
    res.status(201).json(log)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})

/******************************************************************************
 *                      Update sleep_log by sleep Log Id - "PUT
 *                      /sleep/:id"
 ******************************************************************************/

router.put('/:id', async (req, res, next) => {
  const {id} = req.params;
  try {
    const sleepLog = await sleepModel.update(id, req.body)
    res.status(201).json(sleepLog)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})

/******************************************************************************
 *                      Get all sleep logs for a current user -
 *                      "GET
 *                      /sleep/all/:id"
 ******************************************************************************/

router.get('/all/:id', async (req, res, next) => {
  try {
    const logs = await sleepModel.getAllByUserId(req.params.id)
    res.status(200).json(logs)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})

/******************************************************************************
 *                      Get most recent sleep log by userid - "GET
 *                      /sleep/latest/:id"
 ******************************************************************************/

router.get('/latest/:id', async (req, res, next) => {
  try {
    const log = await sleepModel.getLatestByUserId(req.params.id)
    res.status(200).json(log)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})

/******************************************************************************
 *                      Get sleep_log by id - "GET
 *                      /sleep/:id"
 ******************************************************************************/

router.get('/:id', async (req, res, next) => {
  try {
    const [log] = await sleepModel.getById(req.params.id)
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
