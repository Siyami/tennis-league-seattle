'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');
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

router.get('/leagues', (_req, res, next) => {
  knex('leagues')
    .orderBy('starts_at')
    .then((rows) => {
      const leagues = camelizeKeys(rows);

      res.send(leagues);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/leagues', authorize, (req, res, next) => {
  const { league_name, starts_at, ends_at } = req.body;
  const insertLeague = { league_name, starts_at, ends_at };

  knex('leagues')
    .insert(decamelizeKeys(insertLeague), '*')
    .then((rows) => {
      const league = camelizeKeys(rows[0]);

      res.send(league);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
