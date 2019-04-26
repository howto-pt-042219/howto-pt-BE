
exports.up = function(knex, Promise) {
  return knex.schema.createTable('howtos', table => {
    table.increments();

    table.string('title', 128)
      .notNullable()
      .unique();
    
    table.string('overview')
      .notNullable();

    table.integer('likes')
      .defaultTo(0);
    
    table.integer('tries')
      .defaultTo(0);

    table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('user-cred')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('howtos');
};
