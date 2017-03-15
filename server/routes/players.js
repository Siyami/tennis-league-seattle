/* eslint max-len: ["error", 200]*/
'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/players', (req, res, next) => {
  const {
    email, password, first_name, last_name, ntrp_rating, home_court, pic_url, admin
  } = req.body;
  console.log(req.body);

  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  if (!password || password.length < 8) {
    return next(boom.create(400, 'Password must be at least 8 characters'));
  }

  knex('players')
    .where('email', email)
    .first()
    .then((player) => {
      if (player) {
        throw boom.create(400, 'Email already exists');
      }

      return bcrypt.hash(req.body.password, 12)
    })

  .then((hashed_password) => {
      return knex('players').insert({
        first_name,
        last_name,
        email,
        hashed_password,
        ntrp_rating,
        home_court,
        pic_url,
        admin
      }, '*');
    })
    .then((players) => {
      const player = players[0];

      const claim = {
        player_id: player.id
      };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days' // Adds an expiration field to the payload
      });

      res.cookie('token', token, { // cookie is at the header
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // lives 7 days, if you don't include expires after you log out
        secure: router.get('env') === 'production' // forces the token only be sent as https
      });

      delete player.hashed_password;

      res.send(player);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router
