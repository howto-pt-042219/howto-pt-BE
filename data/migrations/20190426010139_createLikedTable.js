
exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', table => {
    table.boolean('liked')
      .defaultTo(true);

    table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('user-cred')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.integer('howto_id')
      .unsigned()
      .references('id')
      .inTable('howtos')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('likes');
};
