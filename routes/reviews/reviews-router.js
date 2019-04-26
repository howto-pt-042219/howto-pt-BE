const router = require('express').Router();

const Reviews = require('./reviews-model.js');
const Users = require('../users/users-model.js');
const HowTo = require('../howto/howto-model.js');

router.post('/', async (req, res) => {
  const newReview = req.body;
  const { text, user_id, howto_id } = newReview;

  if(text && user_id && howto_id) {
    try {
      const user = await Users.findByID(user_id);
      const howto = await HowTo.findByID(howto_id);

      if(user && howto) {
        const review = await Reviews.create(newReview);
        res.status(202).json(review);
      } else {
        res.status(404).json({error: "Either user or howto does not exist."});
      }

    } catch (e) {
      res.status(500).json({error: "Something went wrong with the server."})
    }
  } else {
    res.status(422).json({error: "Please provide text, user_id and howto_id"});
  }
})

module.exports = router;