const db = require('../../data/dbConfig.js');

module.exports = {
  create,
  findBy,
  findByID,
};

async function create(user) {
  const id = await db('user-cred').insert(user, ['id']);
  return findByID(id[0].id);
};

function findBy(username) {
  return db('user-cred').where('username', username);
}

function findByID(id) {
  return db('user-cred').where({id}).first().select('id', 'username', 'creator');
};