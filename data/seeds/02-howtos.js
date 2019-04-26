
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('howtos').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('howtos').insert([
        {title: 'How to make ice', overview: 'A true talent', user_id: 1},
        {title: 'How to let the dogs out', overview: 'You dont know how?', user_id: 1},
        {title: 'How to Things', overview: 'Just try', user_id: 2}
      ]);
    });
};
