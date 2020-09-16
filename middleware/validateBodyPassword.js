const usersModel = require('../models/users');

module.exports = () => (req, res, next) => {
  console.log('validating username')
  const {password} = req.body;
  if (password) {
    next();
  } else {
    res.status(400).json({message: "no password supplied"});
  }
}
