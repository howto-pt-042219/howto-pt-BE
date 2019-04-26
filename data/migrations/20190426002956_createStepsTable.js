
exports.up = function(knex, Promise) {
  return knex.schema.createTable('steps', table => {
    table.increments();

    table.string('title', 128)
      .notNullable();

    table.string('description')
      .notNullable();

    table.integer('howto_id')
      .unsigned()
      .references('id')
      .inTable('howtos')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('steps');
};
