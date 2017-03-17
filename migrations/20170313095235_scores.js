'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('scores', (table) => {
    table.increments();
    table.integer('player_id')
      .notNullable()
      .references('id')
      .inTable('players')
      .onDelete('CASCADE')
      .index();
    table.boolean('won').notNullable().defaultTo(false);
    table.boolean('lost').notNullable().defaultTo(false);
    table.string('score').notNullable().defaultTo('');
    table.string('score_date').notNullable().defaultTo('');
    table.string('oppenent').notNullable().defaultTo('');
    table.timestamps(true, true);

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('scores');
};
