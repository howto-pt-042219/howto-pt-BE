
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user-cred', table => {
    table.increments();

    table.string('username')
      .unique()
      .notNullable();

    table.string('password')
      .notNullable();

    table.boolean('creator')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user-cred');
};
