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
    table.integer('won');
    table.integer('lost');
    table.string('score');
    table.string('score_date');
    table.string('oppenent');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('scores');
};
