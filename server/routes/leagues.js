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

  // if (!title || !title.trim()) {
  //   return next(boom.create(400, 'Title must not be blank'));
  // }
  //
  // if (!author || !author.trim()) {
  //   return next(boom.create(400, 'Author must not be blank'));
  // }
  //
  // if (!genre || !genre.trim()) {
  //   return next(boom.create(400, 'Genre must not be blank'));
  // }
  //
  // if (!description || !description.trim()) {
  //   return next(boom.create(400, 'Description must not be blank'));
  // }
  //
  // if (!coverUrl || !coverUrl.trim()) {
  //   return next(boom.create(400, 'Cover URL must not be blank'));
  // }

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
