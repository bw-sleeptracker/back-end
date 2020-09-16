const usersModel = require('../models/users');

module.exports = () => (req, res, next) => {
  try {
     console.log('validating user id')
    const {id} = req.params;
    usersModel.getById(id)
        .then((user) => {
            if (user) {
                next();
            } else {
                res.status(400).json({message: "Invalid user ID"});
            }
        })
  } catch (err) {
    next(err)
  }
}
