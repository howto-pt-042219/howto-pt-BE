const db = require('../../data/dbConfig.js');

module.exports = {
  create,
  find,
  findByID,
  findSteps,
  findReviews,
  edit,
  remove,
  like,
  tried,
  findLikes,
}

async function create(howto) {
  // const [id] = await db('howtos').insert(howto, ['id']);
  // return findByID(id);
  return db('howtos').insert(howto, ['id'])
};

function find() {
  return db('howtos');
};

async function findByID(id) {
  const likes = await db('likes').count().where('howto_id', id).first();
  const tries = await db('tries').count().where('howto_id', id).first();
  await db('howtos').where({id}).update({'likes': likes['count(*)'], 'tries': tries['count(*)']});
  return db('howtos as h')
  .where('h.id', id)
  .join('user-cred as u', 'u.id', 'h.user_id')
  .select('h.id', 'title', 'overview', 'likes', 'tries', 'username as author', 'u.id as author_id')
  .first();
};

function findSteps(id) {
  return db('howtos as h')
    .where('h.id', id)
    .join('steps as s', 'h.id', 's.howto_id')
    .select('s.id', 's.title', 'description', 'num')
};

function findReviews(id) {
  return db('howtos as h')
    .where('h.id', id)
    .join('reviews as r', 'h.id', 'r.howto_id')
    .join('user-cred as u', 'u.id', 'r.user_id')
    .select('r.id', 'text', 'username');
};

function edit(id, changes) {
  return db('howtos').where({id}).update(changes, ['id']);
};

async function remove(id) {
  await db('steps').where('howto_id', id).del();
  await db('reviews').where('howto_id', id).del();
  return db('howtos').where({id}).del();
};

async function like(data) {
  const liked = await db('likes').where('howto_id', data.howto_id).andWhere('user_id', data.user_id);
  if(liked.length === 0) {
    return db('likes').insert(data, ['id']);
  }
};

async function tried(data) {
  const liked = await db('tries').where('howto_id', data.howto_id).andWhere('user_id', data.user_id);
  if(liked.length === 0) {
    return db('tries').insert(data, ['id']);
  }
};

function findLikes(id) { 
  return db('likes').count().where('howto_id', id).first();
}