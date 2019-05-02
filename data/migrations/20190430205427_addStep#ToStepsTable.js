
exports.up = function(knex, Promise) {
  return knex.schema.table('steps', table => {
    table.integer('num')
      .unsigned();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('steps');
};
