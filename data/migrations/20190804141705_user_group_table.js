exports.up = knex => {
  return knex.schema.createTable('user_group', table => {
    table.increments();
    table.integer('user_id')
         .notNullable()
         .unsigned()
         .references('id')
         .inTable('users')
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
    table.integer('group_id')
         .notNullable()
         .unsigned()
         .references('id')
         .inTable('group')
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('user_group');
};
