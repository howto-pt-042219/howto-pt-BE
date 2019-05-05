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
  const id = await db('reviews').insert(review, ['id']);
  return findByID(id[0].id);
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

async function edit(id, changes) {
  const update = await db('reviews').where('id', id).update(changes, ['id']);
  return update[0].id;
};

function remove(id) {
  return db('reviews').where('id', id).del();
}