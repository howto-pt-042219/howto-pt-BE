const router = require('express').Router({mergeParams: true});
const { viewer, creator } = require('../auth/restricted-middleware.js');

const Reviews = require('./reviews-model.js');
const Users = require('../users/users-model.js');
const HowTo = require('../howto/howto-model.js');

router.post('/', viewer, async (req, res) => { // viewer restriction
  const newReview = { text, user_id} = req.body;
  newReview.howto_id = Number(req.params.id);

  if(text && user_id) {
    try {
      const user = await Users.findByID(user_id);
      const howto = await HowTo.findByID(newReview.howto_id);

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
});

router.get('/', viewer, async (req, res) => { //viewer restriction
  try {
    const reviews = await Reviews.findByHowto(req.params.id);
    res.status(201).json(reviews); 
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."});
  }
})

router.put('/:rev_id', viewer, async (req, res) => { // viewer restriction
  const review = { text } = req.body;
  const { id, rev_id } = req.params;

  if(text) {
    try { 
      const oldReview = await Reviews.findByID(rev_id);

      if(oldReview.user_id === req.decodedJWT.subject) {
        const count = await Reviews.edit(rev_id, review);

        if(count === 1) {
          const updateReview = await Reviews.findByID(rev_id);
          res.status(201).json(updateReview);
        }
      } else {
        res.status(401).json({error: "You are not authorized to edit this Review."})
      }

    } catch (e) {
      res.status(500).json({error: "Something went wrong with the server."});
    }

  } else {
    res.status(422).json({error: "Information missing. Provide both text and user_id."});
  }
});

router.delete('/:rev_id', viewer, async (req, res) => { // viewer restriction
  const { id, rev_id } = req.params;

  try {
    const review = await Reviews.findByID(rev_id);

    if(review.user_id === req.decodedJWT.subject) {
      const count = await Reviews.remove(rev_id);

      if(count === 1) {
        res.status(201).json({message: "Review was deleted."});
      }

    } else {
      res.status(401).json({error: "You are not authorized to delete this review."});
    }

  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
})

module.exports = router;