
exports.up = function(knex) {
  return knex.schema.createTable('courts', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.string('address').notNullable().defaultTo('');
    table.integer('num_of_courts').notNullable().defaultTo(0);
    table.boolean('lights').notNullable().defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('courts');
};
