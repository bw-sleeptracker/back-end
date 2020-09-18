const sleepModel = require('../models/sleep_log');

module.exports = () => (req, res, next) => {
  try {
    console.log('validating sleep_log id')
    const {id} = req.params;
    if (id.length !== 36) {
      res.status(400).json({message: "Invalid sleep_log ID"});
    } else {
      sleepModel.getById(id)
        .then((log) => {
          if (log[0]) {
            next();
          } else {
            res.status(400).json({message: "Invalid sleep_log ID"});
          }
        })
    }
  } catch (err) {
    next(err)
  }
}
