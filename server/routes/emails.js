'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/emails', (req, res, next) => {
  const { leagueId } = req.body;
  const insertPlayersLeague = { playerId: req.claim.playerId, leagueId };

  knex('leagues')
    .where('id', leagueId)
    .first()
    .then((league) => {
      if (!league) {
        throw boom.create(404, 'League not found');
      }

      return knex('players_leagues')
        .insert(decamelizeKeys(insertPlayersLeague), '*');
    })
    .then((rows) => {
      const playersLeague = camelizeKeys(rows[0]);

      res.send(playersLeague);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
