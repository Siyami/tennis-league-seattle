'use strict';

const bcrypt = require('bcrypt-as-promised');
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

router.get('/players', (_req, res, next) => {
  knex('players')
    .orderBy('first_name')
    .then((rows) => {
      const players = camelizeKeys(rows);

      res.send(players);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/players/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('players')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      const player = camelizeKeys(row);

      delete player.hashedPassword;
      res.send(player);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/players', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  if (!password || password.length < 8) {
    return next(boom.create(
      400,
      'Password must be at least 8 characters long'
    ));
  }

  knex('players')
    .where('email', email)
    .first()
    .then((player) => {
      if (player) {
        throw boom.create(400, 'Email already exists');
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const { firstName, lastName, ntrpRating, homeCourt, picUrl, admin } = req.body;
      const insertPlayer = { firstName, lastName, email, hashedPassword, ntrpRating, homeCourt, picUrl, admin };

      return knex('players').insert(decamelizeKeys(insertPlayer), '*');
    })
    .then((rows) => {
      const player = camelizeKeys(rows[0]);
      const claim = { playerId: player.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
        secure: router.get('env') === 'production'
      });

      // Create new cookies for First Name, Last Name and playerId
      res.cookie('playerFirstName', player.firstName, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      });
      res.cookie('playerLastName', player.lastName, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      });
      res.cookie('playerId', player.id, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      });
      res.cookie('playerHomeCourt', player.homeCourt, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      });
      res.cookie('playerEmail', player.email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      });
      res.cookie('admin', player.admin, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      });

      delete player.hashedPassword;

      res.send(player);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
