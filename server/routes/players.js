'use strict';

const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.post('/players', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
      return knex('players').insert({
        email: req.body.email,
        hashed_password: hashed_password
      }, '*');
    })
    .then((players) => {
      const player = players[0];

      delete player.hashed_password;

      res.send(player);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
