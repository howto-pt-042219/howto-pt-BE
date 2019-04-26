
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {text: 'I never knew it could be so simple!', user_id: 1, howto_id: 1},
        {text: 'What even?', user_id: 2, howto_id: 3}
      ]);
    });
};
