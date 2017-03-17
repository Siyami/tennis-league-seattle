'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

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

      // Create new cookie for First Name and Last Name
      res.cookie('playerFirstName', player.firstName);
      res.cookie('playerLastName', player.lastName);

      delete player.hashedPassword;

      res.send(player);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
