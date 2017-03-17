'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/scores', (_req, res, next) => {
  knex('scores')
    .orderBy('id')
    .then((rows) => {
      const scores = camelizeKeys(rows);

      res.send(scores);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/scores/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('scores')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      const score = camelizeKeys(row);

      res.send(score);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/scores', (req, res, next) => {
  const { won, lost, score, scoreDate, opponent } = req.body;

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

  console.log(req.claim.userId);

  const insertScore= { player_id:req.claim.playerId, won, lost, score, scoreDate, opponent };

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

// router.patch('/scores/:id', (req, res, next) => {
//   const id = Number.parseInt(req.params.id);
//
//   if (Number.isNaN(id)) {
//     return next();
//   }
//
//   knex('scores')
//     .where('id', id)
//     .first()
//     .then((score) => {
//       if (!score) {
//         throw boom.create(404, 'Not Found');
//       }
//
//       const { title, author, genre, description, coverUrl } = req.body;
//       const updateScore= {};
//
//       if (title) {
//         updateScore.title = title;
//       }
//
//       if (author) {
//         updateScore.author = author;
//       }
//
//       if (genre) {
//         updateScore.genre = genre;
//       }
//
//       if (description) {
//         updateScore.description = description;
//       }
//
//       if (coverUrl) {
//         updateScore.coverUrl = coverUrl;
//       }
//
//       return knex('scores')
//         .update(decamelizeKeys(updateScore), '*')
//         .where('id', id);
//     })
//     .then((rows) => {
//       const score = camelizeKeys(rows[0]);
//
//       res.send(score);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

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
