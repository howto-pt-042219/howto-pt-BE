const db = require('../../data/dbConfig.js');

module.exports = {
  create,
  findByID,
};

async function create(step) {
  const [id] = await db('steps').insert(step);
  return findByID(id);
}

function findByID(id) {
  return db('steps').where({id}).first();
}