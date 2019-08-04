exports.up = knex => {
  return knex.schema.createTable('message_recipient', table => {
    table.increments();
    table.integer('recipient_id')
         .notNullable()
         .unsigned()
         .references('id')
         .inTable('users')
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
    table.integer('message_id')
         .notNullable()
         .unsigned()
         .references('id')
         .inTable('message')
         .onDelete('CASCADE')
         .onUpdate('CASCADE');
    table.integer('recipient_group_id')
         .notNullable()
         .unsigned()
         .references('id')
         .inTable('group')
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
    table.boolean('is_read').notNullable().defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('message_recipient');
};
