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
 *                      /sleep/users/current-user"
 ******************************************************************************/

router.post('/current-user', async (req, res, next) => {
  const {bedtime} = req.body;
  console.log(req.body)
    try {
    const sleepLog = await sleepModel.create(req.id, bedtime)
      res.status(204).end()
  } catch(err) {
    console.log(err.stack);
    next(err);
  }
})


/******************************************************************************
 *                      Get sleep_log by userId - "GET
 *                      /sleep/users/current-user"
 ******************************************************************************/

// router.get('/current-user',  async (req, res, next) => {
//   try {
//     const user = await sleepModel.getById(req.id)
//     if (user) {
//       res.status(200).json(sleepModel[0])
//     } else {
//       res.status(404).json({message: `Error fetching sleep log, try again later`});
//     }
//   } catch (err) {
//     console.log(err.stack);
//     next(err);
//   }
// });


/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

module.exports = router;
