const usersModel = require('../models/users');

module.exports = () => (req, res, next) => {
  console.log('validating username')
  const {username} = req.body;
  if (username) {
    next();
  } else {
    res.status(400).json({message: "no username supplied"});
  }
}
