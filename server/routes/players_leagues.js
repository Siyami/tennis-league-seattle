'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

///////
router.get('/combined_scores', (req, res, next) => {
  knex('scores')
    .select('*')
    .innerJoin('players', 'scores.player_id', 'players.id')
    .orderBy('scores.score_date')
    .then((scores) => {
      const responseData = camelizeKeys(scores)

      res.send(responseData);
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'from api combined_scores get request'))
    })
})
///////

router.get('/players_leagues/:leagueId', (req, res, next) => {
  const leagueId = Number.parseInt(req.params.leagueId)

  if (Number.isNaN(leagueId)) {
    return next();
  }

  knex('players_leagues')
    .innerJoin('leagues', 'leagues.id', 'players_leagues.league_id')
    .innerJoin('players', 'players.id', 'players_leagues.player_id')
    // .innerJoin('scores', 'scores.player_id', 'players.id' )
    .where('leagues.id', leagueId)
    // .orderBy('leagues.starts_at')
    .then((rows) => {
      const playersLeagues = camelizeKeys(rows);

      res.send(playersLeagues);
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/players_leagues', (req, res, next) => {
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
