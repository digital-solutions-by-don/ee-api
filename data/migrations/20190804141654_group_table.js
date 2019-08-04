exports.up = knex => {
  return knex.schema.createTable('group', table => {
    table.increments();
    table.string('name', 50);
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('group');
};
