const usersModel = require('../models/users');

module.exports = () => async (req, res, next) => {
  console.log('validating username is unique')
  const {username} = req.body;
  const duplicateUser = await usersModel.getBy({username});
  if (duplicateUser.length === 0) {
    next()
  } else {
    res.status(400).json({message: 'username already taken'})
  }
}
