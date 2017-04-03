'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const nodemailer = require('nodemailer');

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

router.post('/emails', authorize, (req, res, next) => {
  const { playerEmail, playerFirstName, text, html } = req.body;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.userName}`,
        pass: `${process.env.password}`
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Admin" <tennisleagueseattle@gmail.com>', // sender address
      to: `<${playerEmail}`, // list of receivers
      subject: 'Tennis League Seattle', // Subject line
      text: `${text}`, // body
      html: `${html}`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
});

module.exports = router;
