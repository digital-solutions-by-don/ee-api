exports.up = knex => {
  return knex.schema.createTable('application', table => {
    table.increments();
    table.integer('user_id')
         .references('id')
         .inTable('users')
         .notNullable()
         .unsigned()
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
    table.string('first_name').notNullable();
    table.string('middle_name');
    table.string('last_name').notNullable();
    table.string('preferred_name');
    table.string('address').notNullable();
    table.string('address2');
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('zip_code').notNullable();
    table.string('phone_number').notNullable();
    table.string('alt_phone_number');
    table.string('email').notNullable();
    table.boolean('weekdays').defaultTo(false);
    table.boolean('weekends').defaultTo(false);
    table.boolean('evenings').defaultTo(false);
    table.boolean('nights').defaultTo(false);
    table.boolean('full_time').defaultTo(false);
    table.boolean('part_time').defaultTo(false);
    table.boolean('temporary').defaultTo(false);
    table.string('position').notNullable();
    table.date('start_date').notNullable();
    table.string('referred_by').notNullable();
    table.string('start_pay').notNullable();
    table.boolean('auth').defaultTo(false);
    table.boolean('under_18').defaultTo(false);
    table.boolean('permit_yes').defaultTo(false);
    table.boolean('permit_no').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('application');
};
