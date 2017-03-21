'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

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

// router.get('/scores/:id', (req, res, next) => {
//   const id = Number.parseInt(req.params.id);
//
//   if (Number.isNaN(id)) {
//     return next();
//   }
//
//   knex('scores')
//     .where('id', id)
//     .first()
//     .then((row) => {
//       if (!row) {
//         throw boom.create(404, 'Not Found');
//       }
//
//       const score = camelizeKeys(row);
//
//       res.send(score);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

router.post('/leagues', (req, res, next) => {
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

// router.delete('/scores/:id', (req, res, next) => {
//   const id = Number.parseInt(req.params.id);
//
//   if (Number.isNaN(id)) {
//     return next();
//   }
//
//   let score;
//
//   knex('scores')
//     .where('id', id)
//     .first()
//     .then((row) => {
//       if (!row) {
//         throw boom.create(404, 'Not Found');
//       }
//
//       score = camelizeKeys(row);
//
//       return knex('scores')
//         .del()
//         .where('id', id);
//     })
//     .then(() => {
//       delete score.id;
//
//       res.send(score);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

module.exports = router;
