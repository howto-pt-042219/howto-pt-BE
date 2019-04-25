const db = require('../../data/dbConfig.js');

module.exports = {
  create,
};

async function create(user) {
  return db('user-cred').insert(user);
}