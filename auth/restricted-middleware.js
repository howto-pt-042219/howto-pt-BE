const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.body.authorization;

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({error: "User not verified.");
      } else {
        req.decodedJWT = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({error: "User not verified."});
  }
}