const jwt = require('jsonwebtoken')

module.exports = () => (req, res, next) => {
  try {
    const token = req.cookies['token'] || req.body.token || req.headers.authorization;
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
      req.token = decoded
      req.id = decoded.userID
      next()
    })
  } catch (err) {
    next(err)
  }
}
