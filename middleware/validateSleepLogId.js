const dayModel = require('../models/day_log');

module.exports = () => (req, res, next) => {
  try {
    console.log('validating day_log id')
    const {id} = req.params;
    if (id.length !== 36) {
      res.status(400).json({message: "Invalid day_log ID"});
    } else {
      dayModel.getById(id)
        .then((log) => {
          if (log[0]) {
            next();
          } else {
            res.status(400).json({message: "Invalid day_log ID"});
          }
        })
    }
  } catch (err) {
    next(err)
  }
}
