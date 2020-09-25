const usersModel = require('../models/users');

module.exports = () => (req, res, next) => {
  try {
    console.log('validating user id')
    const {id} = req.params;
    if (id.length !== 36) {
      res.status(400).json({message: "Invalid user ID"});
    } else {
      usersModel.getById(id)
        .then((user) => {
          if (user[0]) {
            next();
          } else {
            res.status(400).json({message: "Invalid user ID"});
          }
        })
    }
  } catch (err) {
    next(err)
  }
}
