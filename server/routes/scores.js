'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line new-cap
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

router.get('/scores/:leagueId', (req, res, next) => {
  const leagueId = Number.parseInt(req.params.leagueId);

  if (Number.isNaN(leagueId)) {
    return next();
  }

  knex('scores')
    .select('players.id', 'players.first_name', 'players.last_name', 'players.home_court', 'scores.result' )
    .innerJoin('leagues', 'leagues.id', 'scores.league_id')
    .innerJoin('players', 'players.id', 'scores.player_id')
    .where('leagues.id', leagueId)
    .then((rows) => {
      const scores = camelizeKeys(rows);

      res.send(scores);
    })
    .catch((err) => {
      next(err);
    });

});

router.post('/scores', authorize, (req, res, next) => {
  const { leagueId, opponent, result, firstSet1, firstSet2, secondSet1, secondSet2, scoreDate, tieBreak1, tieBreak2 } = req.body;
  const insertScore = { leagueId, playerId: req.claim.playerId, opponent, result, firstSet1, firstSet2, secondSet1, secondSet2, scoreDate, tieBreak1, tieBreak2 };

  knex('scores')
    .insert(decamelizeKeys(insertScore), '*')
    .then((rows) => {
      const score = camelizeKeys(rows[0]);

      res.send(score);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/scores/:id', authorize, (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('scores')
    .where('id', id)
    .first()
    .then((score) => {
      if (!score) {
        throw boom.create(404, 'Not Found');
      }

      const { opponent, result, firstSet1, firstSet2, secondSet1, secondSet2, tieBreak1, tieBreak2, scoreDate, leagueId } = req.body;
      const updateScore= {};

      if (opponent) {
        updateScore.opponent = opponent;
      }
      if (result) {
        updateScore.result = result;
      }
      if (firstSet1) {
        updateScore.firstSet1 = firstSet1;
      }
      if (firstSet2) {
        updateScore.firstSet2 = firstSet2;
      }
      if (secondSet1) {
        updateScore.secondSet1 = secondSet1;
      }
      if (secondSet2) {
        updateScore.secondSet2 = secondSet2;
      }
      if (tieBreak1) {
        updateScore.tieBreak1 = tieBreak1;
      }
      if (tieBreak2) {
        updateScore.tieBreak2 = tieBreak2;
      }
      if (scoreDate) {
        updateScore.scoreDate = scoreDate;
      }
      if(leagueId) {
        updateScore.leagueId = leagueId;
      }

      return knex('scores')
        .update(decamelizeKeys(updateScore), '*')
        .where('id', id);
    })
    .then((rows) => {
      const score = camelizeKeys(rows[0]);

      res.send(score);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
