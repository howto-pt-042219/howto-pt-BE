const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const jwtSecret = process.env.JWT_SECRET;


router.post('/register', async (req, res) => {
  let user = req.body;

  if(user.username && user.password) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    try {
      const newUser = await Users.create(user);
      const token = generateToken(newUser);
      res.status(202).json({token, newUser});
    } catch (e) {
      res.status(500).json({error: "Something went wrong with the server."})
    }
  } else {
    res.status(422).json({error: "Please include both username and password."});
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if(username && password) {
    try {
      const user = await Users.findBy(username);
      console.log(user);
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(202).json({
          token,
          user
        });
      }
    } catch (e) {
      res.status(500).json({error: "Something went wrong with the server."})
    }
  } else {
    res.status(422).json({error: "Please include both username and password."})
  }
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    creator: user.creator === 1 ? true : false
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;