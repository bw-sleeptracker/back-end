const usersModel = require('../models/users');

module.exports = () => (req, res, next) => {
  console.log('validating body')
  const {password, username} = req.body;
  console.log(password, username)
  if (password || username) {
    next();
  } else {
    res.status(400).json({message: "Bad Request, no data sent"});
  }
}
