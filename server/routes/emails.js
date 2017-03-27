'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/emails', (req, res, next) => {
  const { playerEmail, playerFirstName, text, html } = req.body;

  const nodemailer = require("nodemailer");

  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",  // sets automatically host, port and connection security settings
    auth: {
      user: `${process.env.userName}`,
      pass: `${process.env.password}`
    }
  });

  smtpTransport.sendMail({  //email options
     from: "Admin <tennisleagueseattle@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
     to: `<${playerEmail}`, // receiver
     subject: "Tennis League Seattle", // subject
     text: `${text}`, // body
     html: `${html}`
  }, (error, response) => {  //callback
       if(error) {
           console.log(error);
       } else {
           console.log("Message sent: " + response.message);
       }

       smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });

});

module.exports = router;
