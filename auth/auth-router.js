const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const usersModel = require('../models/users');
const {v4: uuidv4} = require('uuid');
const validateBodyUsername = require('../middleware/validateBodyUsername')
const validateBodyPassword = require('../middleware/validateBodyPassword')
const validateUniqueEmail = require('../middleware/validateUniqueEmail')
const validateUniqeUsername = require('../middleware/validateUniqueUsername')
const validateToken = require('./validateToken');


/******************************************************************************
 *                      Register User - "POST /api/auth/register"
 ******************************************************************************/

router.post('/register', validateBodyPassword(), validateBodyUsername(), validateUniqeUsername(), validateUniqueEmail(), async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  user.id = uuidv4();
  try {
    await usersModel.create(user);
    res.status(201).json({message: 'User successfully created'});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // }
});

/******************************************************************************
 *                      Login User - "POST /auth/login"
 ******************************************************************************/


router.post("/login", validateBodyPassword(), validateBodyUsername(), async (req, res, next) => {
  try {
    const {username, password} = req.body
    const user = await usersModel.getBy({username});
    if (user.length === 0) {
      return res.status(401).json({
        message: "Invalid Credentials",
      })
    }
    // hash the password again and see if it matches what we have in the database
    const passwordValid = bcrypt.compareSync(password, user[0].password)
    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      })
    }
    // generate a new JSON web token
    const token = jwt.sign({
      userID: user[0].id,
      userAdmin: user[0].admin
    }, process.env.JWT_SECRET)
    // send the token back as a cookie
    res.cookie("token", token, {
      sameSite: "none",
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true
    })
    res.json({
      token,
      message: `Welcome ${user[0].username}!`,
    })
  } catch (err) {
    next(err)
  }
})

/******************************************************************************
 *                      Logout - "GET /api/auth/logout"
 ******************************************************************************/

router.get('/logout', validateToken(), async (req, res) => {
  await res.clearCookie('token').end();
  // return res.status(OK).end();
});

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

module.exports = router;
