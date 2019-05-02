const router = require('express').Router();
// const { viewer, creator } = require('../auth/restricted-middleware.js');

const HowTo = require('./howto-model.js');
const Users = require('../users/users-model.js');

const stepsRouter = require('../steps/steps-router.js');
const reviewsRouter = require('../reviews/reviews-router.js');

router.post('/', async (req, res) => {  // creator restriction
  const newHowto = { title, overview } = req.body;

  if(title && overview) {
    newHowto.user_id = req.body.user_id || req.decodedJWT.subject

    try {
      const user = await Users.findByID(newHowto.user_id);

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

router.get('/', async (req, res) => {  // viewer restriction
  try {
    const howtos = await HowTo.find();
    res.status(201).json(howtos);
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."});
  }
});

router.get('/:id', async (req, res) => {  // viewer restriction
  const { id } = req.params;

  try {
    const howto = await HowTo.findByID(id);

    if(howto) {
      const steps = await HowTo.findSteps(id);
      steps.sort((a, b) => a.num - b.num)
      const reviews = await HowTo.findReviews(id);
      res.status(201).json({...howto, steps, reviews});
    } else {
      res.status(404).json({error: "How To with that ID does not exist."});
    }
    
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."});
  }
});

router.put('/:id', async (req, res) => {  // creator restriction
  const howto ={ title, overview } = req.body;
  const {id} = req.params;

  if(title && overview) {
    try {
      const oldHowto = await HowTo.findByID(id);

      if(oldHowto ) { // replace for auth ** && req.decodedJWT.subject === oldHowto.author_id **
        howto.user_id = oldHowto.author_id;
        const count = await HowTo.edit(id, howto);

        if(count === 1 ) {
          const updateHowto = await HowTo.findByID(id);
          res.status(201).json(updateHowto);
        }
       
      } else {
        res.status(404).json({error: "Either user or howto does not exist."});
      }

    } catch (e) {
      res.status(500).json({error: "Something went wrong with the server."});
    }

  } else {
    res.status(422).json({error: "Please provide title, overview and user_id"});
  }
});

router.delete('/:id', async (req, res) => {  // creator restriction
  const { id } = req.params;

  try {
    const howto = await HowTo.findByID(id);
    
    if(howto ) {  // replace for auth ** && req.decodedJWT.subject === howto.author_id **
      const count = await HowTo.remove(id);
      
      if(count === 1) {
        res.status(201).json({message: "How To was deleted."})
      }

    } else {
      res.status(404).json({error: "How To was not found."})
    }

  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."});
  }
})

router.use('/:id/steps', stepsRouter);
router.use('/:id/reviews', reviewsRouter);

module.exports = router;