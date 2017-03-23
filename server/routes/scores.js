'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

////////////
// router.get('/players_leagues/:leagueId', (req, res, next) => {
//   const leagueId = Number.parseInt(req.params.leagueId);
//
//   if (Number.isNaN(leagueId)) {
//     return next();
//   }
//
//   knex('players_leagues')
//     .innerJoin('leagues', 'leagues.id', 'players_leagues.league_id')
//     .innerJoin('players', 'players.id', 'players_leagues.player_id')
//     // .innerJoin('scores', 'scores.player_id', 'players.id' )
//     .where('leagues.id', leagueId)
//     // .orderBy('leagues.starts_at')
//     .then((rows) => {
//       const playersLeagues = camelizeKeys(rows);
//
//       res.send(playersLeagues);
//     })
//     .catch((err) => {
//       next(err);
//     })
// })
//////////

router.get('/scores/:leagueId', (req, res, next) => {
  const leagueId = Number.parseInt(req.params.leagueId);

  if (Number.isNaN(leagueId)) {
    return next();
  }

  knex('scores')
    .innerJoin('leagues', 'leagues.id', 'scores.league_id')
    .innerJoin('players', 'players.id', 'scores.player_id')
    .where('leagues.id', leagueId)
    .then((rows) => {
      const scores = camelizeKeys(rows);

      res.send(scores);
    })
    .catch((err) => {
      next(err);
    })

})


// router.get('/scores', (_req, res, next) => {
//   knex('scores')
//     .orderBy('id')
//     .then((rows) => {
//       const scores = camelizeKeys(rows);
//
//       res.send(scores);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.get('/scores/:id', (req, res, next) => {
//   const id = Number.parseInt(req.params.id);
//
//   if (Number.isNaN(id)) {
//     return next();
//   }
//
//   knex('scores')
//     .innerJoin('players')
//     .where('scores.id', id)
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

router.post('/scores', (req, res, next) => {
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
