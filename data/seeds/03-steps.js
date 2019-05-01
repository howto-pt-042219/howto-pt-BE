
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('steps').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        {title: 'Only Step', description: 'Freeze water', num: 1, howto_id: 1},
        {title: 'Open the door', description: 'This is the logical first step', num: 1, howto_id: 2},
        {title: 'Get on the floor', description: 'Dance like everyone is judging', num: 2, howto_id: 2},
        {title: 'Huh?', description: 'If you dont know you cant afford it', num: 1, howto_id: 3}
      ]);
    });
};
