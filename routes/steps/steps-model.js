const db = require('../../data/dbConfig.js');

module.exports = {
  create,
  find,
  findByID,
  findByHowto,
  edit,
  remove,
};

async function create(step) {
  const id = await db('steps').insert(step, ['id']);
  return findByID(id[0].id);
};

function find() {
  return db('steps');
};

function findByID(id) {
  return db('steps').where({id}).first();
};

function findByHowto(howto_id) {
  return db('steps').where({howto_id});
};

async function edit(id, changes) {
  const update = await db('steps').where('id', id).update(changes, ['id']);
  return update[0].id;
};

function remove(id) {
  return db('steps').where('id', id).del();
}