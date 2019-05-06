const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  viewer,
  creator,
}

function viewer(req, res, next) {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({error: "User not verified!"});
      } else {
        req.decodedJWT = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({error: "User not verified."});
  }
};

function creator(req, res, next) {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({error: "User not verified."})
      } else {
        req.decodedJWT = decodedToken;
        if(decodedToken.creator) {
          next();
        } else {
          console.log(decodedToken);
          res.status(401).json({error: "You dont have the ability to delete that how to."})
        }
      }
    })
  } else {
    res.status(401).json({error: "User not verified."})
  }
}