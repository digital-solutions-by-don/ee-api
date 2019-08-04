exports.up = knex => {
  return knex.schema.createTable('message', table => {
    table.increments();
    table.string('subject', 50)
         .notNullable();
    table.integer('creator_id')
         .notNullable()
         .unsigned()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .onUpdate('CASCADE');
    table.integer('parent_message_id')
         .notNullable()
         .unsigned()
         .references('id')
         .inTable('message')
         .onDelete('CASCADE')
         .onUpdate('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('message');
};
