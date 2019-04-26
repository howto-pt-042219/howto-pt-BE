const db = require('../../data/dbConfig.js');

module.exports = {
  create,
  findByID,
};

async function create(review) {
  const [id] = await db('reviews').insert(review);
  return findByID(id);
};

function findByID(id) {
  return db('reviews').where({id}).first();
}