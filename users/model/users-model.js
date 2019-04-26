const db = require('../../data/dbConfig.js');

module.exports = {
  create,
  findBy,
};

async function create(user) {
  const [id] = await db('user-cred').insert(user);
  return findByID(id);
};

function findBy(username) {
  return db('user-cred').where(username)
}

async function findByID(id) {
  return db('user-cred').where({id}).first().select('id', 'username');
};