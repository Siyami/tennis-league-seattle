'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

// One to Many relation between users and scores table
router.get('/combined_scores', (req, res, next) => {
  knex('scores')
    .select('*')
    .orderBy('scores.score_date')
    .innerJoin('players', 'scores.player_id', 'players.id')
    .then((scores) => {
      const responseData = camelizeKeys(scores)

      res.send(responseData);
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'from api combined_scores get request'))
    })
})

module.exports = router;
