'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys } = require('humps');

const router = express.Router();

router.post('/token', (req, res, next) => {
  let player;

  knex('players')
    .where('email', req.body.email)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Bad email or password');
      }
      player = camelizeKeys(row);

      return bcrypt.compare(req.body.password, player.hashedPassword);
    })
    .then(() => {
      const claim = { playerId: player.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // lives 7 days
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
      })
      res.cookie('playerEmail', player.email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      })
      res.cookie('admin', player.admin, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      })

      delete player.hashedPassword;

      res.send(player);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(400, 'Bad email or password');
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, _payload) => {
    if (err) {
      return res.send(false);
    }

    res.send(true);
  });
});

router.delete('/token', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('playerFirstName');
  res.clearCookie('playerLastName');
  res.clearCookie('playerId');
  res.clearCookie('playerHomeCourt');
  res.clearCookie('playerEmail');
  res.clearCookie('admin');
  res.end();
});

module.exports = router;
