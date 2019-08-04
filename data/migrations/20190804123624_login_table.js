exports.up = knex => {
  return knex.schema.createTable('login', table => {
    table.increments();
    table.string('email', 128).notNullable().unique();
    table.string('password', 128).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('login');
};
