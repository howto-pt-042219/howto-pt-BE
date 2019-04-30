const db = require('../../data/dbConfig.js');

module.exports = {
  create,
  find,
  findByID,
  findByHowto,
};

async function create(step) {
  const [id] = await db('steps').insert(step);
  return findByID(id);
};

function find() {
  return db('steps');
};

function findByID(id) {
  return db('steps').where({id}).first();
};

function findByHowto(howto_id) {
  return db('steps').where({howto_id});
}