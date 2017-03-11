'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('players', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('email').unique().notNullable();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.string('ntrp_rating').notNullable().defaultTo('');
    table.string('home_court').notNullable().defaultTo('');
    table.string('pic_url').notNullable().defaultTo('');
    table.boolean('admin').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('players');
};
