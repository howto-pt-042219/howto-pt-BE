const router = require('express').Router({mergeParams: true});

const Steps = require('./steps-model.js');
const HowTo = require('../howto/howto-model.js');

router.post('/', async (req, res) => {
  const newStep = req.body;
  const { title, description } = newStep;
  newStep.howto_id = req.params.id;

  if(title && description) {
    try {
      const howto = await HowTo.findByID(newStep.howto_id);

      if(howto) {
        const step = await Steps.create(newStep);
        res.status(202).json(step);
      } else {
        res.status(404).json({error: "HowTo with that ID does not exist."});
      }

    } catch (e) {
      res.status(500).json({error: "Something went wrong with the server."})
    }
  } else {
    res.status(422).json({error: "Please provide both title and description."});
  }
});

router.get('/', async (req, res) => {
  try {
    const steps = await Steps.findByHowto(req.params.id);
    res.status(201).json(steps);
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
})

module.exports = router;