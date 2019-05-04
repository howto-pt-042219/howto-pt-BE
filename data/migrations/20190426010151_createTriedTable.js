
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tries', table => {
    table.increments();
    
    table.boolean('tried')
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
  return knex.schema.dropTableIfExists('tries');
};
