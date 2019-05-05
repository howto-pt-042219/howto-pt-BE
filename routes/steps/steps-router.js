const router = require('express').Router({mergeParams: true});  // /howto/:id/steps
const knex = require('knex');
const config = require('../../knexfile.js');

const dbENV = process.env.DB_ENV || 'development';
const connection = knex(config[dbENV]);

const Steps = require('./steps-model.js');
const HowTo = require('../howto/howto-model.js');

router.post('/', async (req, res) => { // creator restriction
  const newStep = { title, description, num } = req.body;
  newStep.howto_id = Number(req.params.id);

  if(title && description && num) {
    try {
      const howto = await HowTo.findByID(newStep.howto_id);

      if(howto) {
        let steps = await Steps.findByHowto(newStep.howto_id);

        if(steps.map(step => step.num).includes(num)) {

          connection.transaction(trx => {
            let updates = steps.map(step => {
              if(step.num >= num) {
                step.num += 1;
              }
              return connection('steps')
                .where('id', step.id)
                .update(step)
                .transacting(trx)
            });
            return Promise.all(updates)
              .then(trx.commit)
              .catch(trx.rollback);
          })
        } 

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

router.get('/', async (req, res) => { // viewer restriction
  try {
    const steps = await Steps.findByHowto(req.params.id);
    steps.sort((a, b) => a.num - b.num);
    res.status(201).json(steps);
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
});

router.put('/:step_id', async (req, res) => { // creator restriction
  const newStep = { title, description } = req.body;
  const { id, step_id } = req.params;

  if(title && description) {
    try {
      const step = await Steps.findByID(step_id);
      // const howto = await HowTo.findByID(id);

      if(step) {
        newStep.howto_id = step.howto_id;
        newStep.num = step.num;
        const count = await Steps.edit(step_id, newStep);
        
        if(count === Number(step_id)) {
          const updateStep = await Steps.findByID(step_id);
          res.status(201).json(updateStep);
        }
      } else {
        res.status(404).json({error: "Step with that ID does not exist."})
      }

    } catch (e) {
      res.status(500).json({error: "Something went wrong with the server."})
    }

  } else {
    res.status(422).json({error: "Provide both title and description."})
  }
});

router.delete('/:step_id', async (req, res) => { // creator restriction
  const id = req.params.step_id;

  try {
    const step = await Steps.findByID(id);

    if(step) {
      const steps = await Steps.findByHowto(step.howto_id);
      
      connection.transaction(trx => {
        let updates = steps.map(el => {
          if(el.num > step.num) {
            el.num -= 1
          }
          return connection('steps')
            .where('id', el.id)
            .update(el)
            .transacting(trx)
        });
        return Promise.all(updates)
          .then(trx.commit)
          .catch(trx.rollback);
      });

      const count = await Steps.remove(id);
      if(count === 1) {
        res.status(201).json({message: "Step was deleted."})
      }
    }

  } catch (e) { 
    res.status(500).json({error: "Something went wrong with the server."})
  }
})

module.exports = router;