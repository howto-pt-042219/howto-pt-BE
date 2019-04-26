const router = require('express').Router();

const Steps = require('./steps-model.js');
const HowTo = require('../howto/howto-model.js');

router.post('/', async (req, res) => {
  const newStep = req.body;
  const { title, description, howto_id } = newStep;

  if(title && description && howto_id) {
    try {
      const howto = await HowTo.findByID(howto_id);

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
})

module.exports = router;