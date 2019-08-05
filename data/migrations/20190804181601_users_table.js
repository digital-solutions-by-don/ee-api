exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email', 128).notNullable().unique();
    table.string('role').notNullable().defaultTo('user');
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('users');
};
