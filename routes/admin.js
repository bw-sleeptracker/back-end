const express = require('express');
const router = express.Router();
const usersModel = require('../models/users');
const validateUserId = require('../middleware/validateUserId');

/******************************************************************************
 *                      Get all users - "GET /admin/users"
 ******************************************************************************/

router.get('/users', async (req, res, next) => {
  try {
    const users = await usersModel.get()
    if (users) {
      res.status(200).json(users)
    } else {
      res.status(404).json({message: `Error fetching users`});
    }
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
});

/******************************************************************************
 *                      Get user by id - "GET /admin/users/:id"
 ******************************************************************************/

router.get('/users/:id', validateUserId(), async (req, res, next) => {
  try {
    const user = await usersModel.getById(req.params.id)
    if (user) {
      res.status(200).json(user[0])
    } else {
      res.status(404).json({message: `Error fetching user, try again later`});
    }
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
});

/******************************************************************************
 *                      Delete user - "DELETE /admin/users/:id"
 ******************************************************************************/

router.delete('/users/:id', validateUserId(), async (req, res, next) => {
  try {
    const result = await usersModel.remove(req.params.id);
    if (result) {
      res.status(204).end()
    } else {
      res.status(404).json({message: 'Error deleting user, try again later'})
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
