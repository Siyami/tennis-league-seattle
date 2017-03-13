'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('players_leagues', (table) => {
    table.increments();
    table.integer('player_id')
      .notNullable()
      .references('id')
      .inTable('players')
      .onDelete('CASCADE')
      .index();
    table.integer('league_id')
      .notNullable()
      .references('id')
      .inTable('leagues')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('players_leagues');
};
