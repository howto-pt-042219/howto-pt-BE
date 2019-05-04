const db = require('../../data/dbConfig.js');

module.exports = {
  create,
  find,
  findByID,
  findByHowto,
  edit,
  remove,
};

async function create(review) {
  const [id] = await db('reviews').insert(review, ['id']);
  return findByID(id);
};

function find() {
  return db('steps');
};

function findByID(id) {
  return db('reviews').where({id}).first();
};

function findByHowto(howto_id) {
  return db('reviews').where({howto_id});
}

function edit(id, changes) {
  return db('reviews').where({id}).update(changes, ['id']);
};

function remove(id) {
  return db('reviews').where({id}).del();
}