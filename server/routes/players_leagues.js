'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, playload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = playload;

    next();
  });
};

router.get('/players_leagues/:leagueId', (req, res, next) => {
  const leagueId = Number.parseInt(req.params.leagueId);

  if (Number.isNaN(leagueId)) {
    return next();
  }

  knex('players_leagues')
    .innerJoin('leagues', 'leagues.id', 'players_leagues.league_id')
    .innerJoin('players', 'players.id', 'players_leagues.player_id')
    .where('leagues.id', leagueId)
    .orderBy('players_leagues.created_at')
    .then((rows) => {
      const playersLeagues = camelizeKeys(rows);

      res.send(playersLeagues);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/players_leagues', authorize, (req, res, next) => {
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
