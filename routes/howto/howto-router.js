const router = require('express').Router();

const HowTo = require('./howto-model.js');
const Users = require('../users/users-model.js');

router.post('/', async (req, res) => {  // Add restriction later
  const newHowto = req.body;
  const { title, overview, user_id } = newHowto;

  if(title && overview && user_id) {
    try {
      const user = await Users.findByID(user_id);

      if(user) {
        const howto = await HowTo.create(newHowto);
        res.status(202).json(howto);
      } else {
        res.status(404).json({error: "User with that ID does not exist."});
      }

    } catch (e) {
      res.status(500).json({error: "Something went wrong with the server."});
    }
  } else {
    res.status(422).json({error: "Please provide title, overview and user_id"});
  }
});

router.get('/', async (req, res) => {
  try {
    const howtos = await HowTo.find();
    res.status(201).json(howtos);
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."});
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const howto = await HowTo.findByID(id);
    const steps = await HowTo.findSteps(id);
    const reviews = await HowTo.findReviews(id);
    res.status(201).json({...howto, steps, reviews});
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
})


module.exports = router;