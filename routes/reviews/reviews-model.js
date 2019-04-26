const db = require('../../data/dbConfig.js');

module.exports = {
  create,
  find,
  findByID,
};

async function create(review) {
  const [id] = await db('reviews').insert(review);
  return findByID(id);
};

function find() {
  return db('steps');
}

function findByID(id) {
  return db('reviews').where({id}).first();
}