const express = require('express');
const router = express.Router();
const dayModel = require('../models/day_log');
const qualityModel = require('../models/quality_log');
const weekModel = require('../models/week_log');
const monthModel = require('../models/month_log');
const usersModel = require('../models/users');
const validateToken = require('../auth/validateToken');
const validateUserId = require('../middleware/validateUserId');
const validateAdmin = require('../auth/validateAdmin');
const validateBody = require('../middleware/validateUserUpdateBody');
const validateCreateLogBody = require('../middleware/validateCreateLogBody')
const validateUpdateLogBody = require('../middleware/validateUpdateLogBody')
const validateDateQuery = require('../middleware/validateDateQuery')
const validateSleepLogId = require('../middleware/validateSleepLogId')


/******************************************************************************
 *                      Create sleep day_log by userId - "POST
 *                      /day/current-user"
 ******************************************************************************/

router.post('/current-user', validateCreateLogBody(), async (req, res, next) => {
  const {bedtime} = req.body;
  try {
    const dayLogId = await dayModel.create(req.id, bedtime)
    const [log] = await dayModel.getById(dayLogId)
    res.status(201).json(log)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})

/******************************************************************************
 *                      Update sleep day_log by sleep Log Id - "PUT
 *                      /day/:id"
 ******************************************************************************/

router.put('/:id', validateUpdateLogBody(), validateSleepLogId(),  async (req, res, next) => {
  const {id} = req.params;
  try {
    const sleepLog = await dayModel.update(req.id, id, req.body)
    res.status(201).json(sleepLog)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})


/******************************************************************************
 *                      Get all sleep day_logs for a current user -
 *                      "GET
 *                      /day/current-user"
 ******************************************************************************/

router.get('/current-user', async (req, res, next) => {
  try {
    const logs = await dayModel.getAllByUserId(req.id)
    res.status(200).json(logs)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})

/******************************************************************************
 *                      Get current users sleep day_log by date - "GET
 *                      /day/current-user/search/date?={date}"
 ******************************************************************************/

router.get('/current-user/search', validateDateQuery(),  async (req, res, next) => {
  try {
    const log = await dayModel.getByDate(req.id, req.query.date)
    res.status(200).json(log)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})

// TODO consider moving to admin router
/******************************************************************************
 *                      Get sleep day_log by id - "GET
 *                      /day/:id"
 ******************************************************************************/

router.get('/:id', validateSleepLogId(), async (req, res, next) => {
  try {
    const [log] = await dayModel.getById(req.params.id)
    res.status(200).json(log)
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})

/******************************************************************************
 *                      Delete sleep_log by id - "GET
 *                      /day/:id"
 ******************************************************************************/

router.delete('/:id', validateSleepLogId(), async (req, res, next) => {
  try {
    await dayModel.remove(req.params.id)
    res.status(204).end()
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
})





/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

module.exports = router;
