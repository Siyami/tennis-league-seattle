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
      const responseData = camelizeKeys(scores)

      res.send(responseData);
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'from api combined_scores get/:id request'))
    })

})



module.exports = router;
