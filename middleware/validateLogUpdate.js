const dayModel = require('../models/day_log')


module.exports = () => (req, res, next) => {
  console.log('validating log update')
  const {id} = req.params
  const completed = dayModel.getById(id)
  console.log(completed)
  if (completed.completed === true) {
    res.status(400).json({message: "Log already completed"});
  } else {
    next();
  }
}
