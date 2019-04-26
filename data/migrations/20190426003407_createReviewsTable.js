
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', table => {
    table.increments();

    table.string('text')
      .notNullable();

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
  return knex.schema.dropTableIfExists('reviews');
};
