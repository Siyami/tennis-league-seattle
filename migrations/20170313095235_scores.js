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
    table.string('opponent').notNullable().defaultTo('');
    table.string('result').notNullable().defaultTo('');
    table.string('first_set1').notNullable().defaultTo('');
    table.string('first_set2').notNullable().defaultTo('');
    table.string('second_set1').notNullable().defaultTo('');
    table.string('second_set2').notNullable().defaultTo('');
    table.string('tie_break1').notNullable().defaultTo('');
    table.string('tie_break2').notNullable().defaultTo('');
    table.string('score_date').notNullable().defaultTo('');
    table.timestamps(true, true);

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('scores');
};
