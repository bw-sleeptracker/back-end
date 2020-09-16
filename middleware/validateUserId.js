const usersModel = require('../models/users');

module.exports = () => (req, res, next) => {
  try {
     console.log('validating user id')
    const {id} = req.params;
    usersModel.getById(id)
        .then((user) => {
          console.log({user})
            if (user[0]) {
                next();
            } else {
                res.status(400).json({message: "Invalid user ID"});
            }
        })
  } catch (err) {
    next(err)
  }
}
