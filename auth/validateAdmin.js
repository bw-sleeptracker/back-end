const jwt = require('jsonwebtoken')

module.exports = () => (req, res, next) => {
  console.log('validating admin')
  try {
    const token = req.cookies['token'] || req.body.token;
    if (!token) {
      return res.status(401).json({
        message: "missing required token"
      })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "invalid token"
        })
      }
      console.log(decoded.userAdmin)
      	// checking that the user is an admin
        // todo: no user role in users table yet, need to add
				if (decoded.userAdmin !== 1) {
					return res.status(403).json({
						message: "Unauthorized",
					})
				}
      req.token = decoded
      req.id = decoded.userID
      next()
    })
  } catch (err) {
    next(err)
  }
}
