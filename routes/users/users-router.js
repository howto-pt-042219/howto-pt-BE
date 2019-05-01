const router = require('express').Router();
const { viewer } = require('../auth/restricted-middleware.js');


router.get('/', viewer, async (req, res) => {
  res.status(201).json(req.decodedJWT);
})

module.exports = router;