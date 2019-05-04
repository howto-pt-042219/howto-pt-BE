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
  const [id] = await db('steps').insert(step, ['id']);
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
};

function edit(id, changes) {
  return db('steps').where({id}).update(changes, ['id']);
};

function remove(id) {
  return db('steps').where({id}).del();
}