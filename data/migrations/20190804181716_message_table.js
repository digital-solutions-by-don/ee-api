exports.up = knex => {
  return knex.schema.createTable('messages', table => {
    table.increments();
    table.integer('creator_id')
         .references('id')
         .inTable('user')
         .notNullable()
         .unsigned()
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
    table.string('message_subject', 255)
         .notNullable();
    table.string('message_body')
         .notNullable();
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('messages');
};
