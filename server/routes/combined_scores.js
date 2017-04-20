'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

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

// One to Many relation between users and scores table
router.get('/combined_scores', (req, res, next) => {
  knex('scores')
    .select('admin','email', 'first_name', 'last_name', 'first_set1', 'first_set2', 'second_set1', 'second_set2', 'tie_break1', 'tie_break2', 'players.id', 'scores.id as scoreId', 'scores.id as scores_id', 'home_court', 'league_id', 'ntrp_rating', 'opponent', 'pic_url', 'player_id', 'result', 'score_date')
    .innerJoin('players', 'scores.player_id', 'players.id')
    .orderBy('scores.score_date')
    .then((scores) => {
      const responseData = camelizeKeys(scores);

      res.send(responseData);
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'from api combined_scores get request'));
    });
});

// One to Many relation between users and scores table
router.get('/combined_scores/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('scores')
    .select('*')
    .innerJoin('players', 'scores.player_id', 'players.id')
    .where('scores.player_id', id)
    .orderBy('scores.score_date')
    .then((scores) => {
      const responseData = camelizeKeys(scores);

      res.send(responseData);
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'from api combined_scores get/:id request'));
    });
});

module.exports = router;
