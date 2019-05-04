const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user-cred').del()
    .then(function () {
      const hash = bcrypt.hashSync('123', 10);
      // Inserts seed entries
      return knex('user-cred').insert([
        {username: 'Sam', password: hash, creator: true},
        {username: 'Dave', password: hash, creator: false}
      ]);
    });
};
