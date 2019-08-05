exports.up = knex => {
  return knex.schema.createTable('employment', table => {
    table.increments();
    table.integer('app_id')
         .references('id')
         .inTable('application')
         .notNullable()
         .unsigned()
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
    table.string('employer')
         .notNullable();
    table.string('location')
         .notNullable();
    table.date('start_date')
         .notNullable();
    table.date('end_date');
    table.boolean('contact')
         .defaultTo(false);
    table.string('reason_for_leaving')
         .notNullable();
    table.string('supervisor')
         .notNullable();
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('employment');
};
