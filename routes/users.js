const express = require('express');
const router = express.Router();
const usersModel = require('../models/users');
const validateToken = require('../auth/validateToken');
const validateUserId = require('../middleware/validateUserId');
const validateAdmin = require('../auth/validateAdmin');
const validateUserUpdateBody = require('../middleware/validateUserUpdateBody');



/******************************************************************************
 *                      Get current user - "GET /users/current-user"
 ******************************************************************************/

   router.get('/current-user', validateToken(), async (req, res, next) => {
    try {
      const user = await usersModel.getById(req.id)
      if (user) {
        res.status(200).json(user[0])
      } else {
        res.status(404).json({message: `No user found with that id`});
      }
    } catch (err) {
      console.log(err.stack);
      next(err);
    }
  });

/******************************************************************************
 *                      Update current user - "PUT /users/current-user"
 ******************************************************************************/

  router.put('/current-user', validateToken(), validateUserUpdateBody(),
  async (req, res, next) => {
  console.log(req.body)
  const user = {
  username: req.body.username,
  password: req.body.password,
  email: req.body.email,
  id: req.id,
  }
  console.log({user})
  try {
      const result = await usersModel.update(user);
      if (result) {
        res.status(204).end();
      } else {
        res.status(400).json({message: 'Error updating user'});
      }
    } catch (err) {
      console.log(err.stack);
      next(err);
    }
  });

/******************************************************************************
 *                      Delete current user - "DELETE /users/current-user"
 ******************************************************************************/

router.delete('/current-user',validateToken(), async (req, res, next) => {
    try {
      const result = await usersModel.remove(req.id);
      if (result) {
        await res.clearCookie('token').end();
        //res.status(204).end()
      } else {
        res.status(404).json({message: 'Error deleting user'})
      }
    } catch (err) {
      console.log(err.stack);
      next(err);
    }
  });

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

module.exports = router;
