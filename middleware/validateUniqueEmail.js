const usersModel = require('../models/users');

module.exports = () => async (req, res, next) => {
  console.log('validating username is unique')
  const {email} = req.body;
  const duplicateEmail = await usersModel.getBy({email});
  if (duplicateEmail.length === 0) {
    next()
  } else {
    res.status(400).json({message: 'email already taken'})
  }
}
