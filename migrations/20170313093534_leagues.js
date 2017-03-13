'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('leagues', (table) => {
    table.increments();
    table.string('league_name').notNullable().defaultTo('');
    table.string('starts_at').notNullable().defaultTo('');
    table.string('ends_at').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('leagues');
};
