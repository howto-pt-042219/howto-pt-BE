const db = require('../../data/dbConfig.js');

module.exports = {
  create,
  findByID,
}

async function create(howto) {
  const [id] = await db('howtos').insert(howto);
  return findByID(id);
};

function findByID(id) {
  return db('howtos').where({id}).first();
}