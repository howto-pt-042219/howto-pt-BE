const router = require('express').Router();
const { viewer, creator } = require('../auth/restricted-middleware.js');

const HowTo = require('./howto-model.js');
const Users = require('../users/users-model.js');

const stepsRouter = require('../steps/steps-router.js');
const reviewsRouter = require('../reviews/reviews-router.js');

router.post('/', creator, async (req, res) => {  // creator restriction
  const newHowto = { title, overview } = req.body;

  if(title && overview) {
    newHowto.user_id = req.decodedJWT.subject

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

router.post('/:id/liked', viewer, async (req, res) => {
  const data = {
    howto_id: Number(req.params.id),
    user_id: req.decodedJWT.subject
  };
 
  try {
    const count = await HowTo.like(data);

    if(count > 0) {
      res.status(201).json({message: "Liked!"})
    } else {
      res.status(422).json({message: "Already liked"})
    }
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
});

router.post('/:id/tried', viewer, async (req, res) => {
  const data = {
    howto_id: Number(req.params.id),
    user_id: req.decodedJWT.subject
  };
 
  try {
    const count = await HowTo.tried(data);

    if(count > 0) {
      res.status(201).json({message: "Tried!"})
    } else {
      res.status(422),json({message: "Already tried"})
    }
    
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
});

router.get('/', viewer, async (req, res) => {  // viewer restriction
  try {
    const howtos = await HowTo.find();
    res.status(201).json(howtos);
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."});
  }
});

router.get('/:id', viewer, async (req, res) => {  // viewer restriction
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

router.put('/:id', creator, async (req, res) => {  // creator restriction
  const howto ={ title, overview } = req.body;
  const {id} = req.params;

  if(title && overview) {
    try {
      const oldHowto = await HowTo.findByID(id);

      if(req.decodedJWT.subject === oldHowto.author_id) { // add for auth ** && req.decodedJWT.subject === oldHowto.author_id **
        howto.user_id = oldHowto.author_id;
        const count = await HowTo.edit(id, howto);

        if(count === 1 ) {
          const updateHowto = await HowTo.findByID(id);
          res.status(201).json(updateHowto);
        }
       
      } else {
        res.status(401).json({error: "You are not authorized to edit this How To."});
      }

    } catch (e) {
      res.status(500).json({error: "Something went wrong with the server."});
    }

  } else {
    res.status(422).json({error: "Please provide title, overview and user_id"});
  }
});

router.delete('/:id', creator, async (req, res) => {  // creator restriction
  const { id } = req.params;

  try {
    const howto = await HowTo.findByID(id);
    
    if(req.decodedJWT.subject === howto.author_id) {  // add for auth ** && req.decodedJWT.subject === howto.author_id **
      const count = await HowTo.remove(id);
      
      if(count === 1) {
        res.status(201).json({message: "How To was deleted."})
      }

    } else {
      res.status(401).json({error: "You are not authorized to delete this How To."})
    }

  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."});
  }
})

router.use('/:id/steps', stepsRouter);
router.use('/:id/reviews', reviewsRouter);

module.exports = router;