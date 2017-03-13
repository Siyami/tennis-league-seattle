'use strict';

const bcrypt = require('bcrypt-as-promised');
const express = require('express');

const router = express.Router();

router.post('/players', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
      console.log(req.body.email, hashed_password);
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
