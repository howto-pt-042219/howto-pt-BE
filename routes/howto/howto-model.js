const db = require('../../data/dbConfig.js');

module.exports = {
  create,
  find,
  findByID,
  findSteps,
  findReviews,
}

async function create(howto) {
  const [id] = await db('howtos').insert(howto);
  return findByID(id);
};

function find() {
  return db('howtos');
};

function findByID(id) {
  return db('howtos as h')
  .where('h.id', id)
  .join('user-cred as u', 'u.id', 'h.user_id')
  .select('h.id', 'title', 'overview', 'likes', 'tries', 'username as author')
  .first();
};

function findSteps(id) {
  return db('howtos as h')
    .where('h.id', id)
    .join('steps as s', 'h.id', 's.howto_id')
    .select('s.id', 's.title', 'description')
};

function findReviews(id) {
  return db('howtos as h')
    .where('h.id', id)
    .join('reviews as r', 'h.id', 'r.howto_id')
    .join('user-cred as u', 'u.id', 'r.user_id')
    .select('r.id', 'text', 'username');
}