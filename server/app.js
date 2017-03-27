'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const boom = require('boom');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(morgan('short'));
app.use(bodyParser.json());
app.disable('x-powered-by');
app.use(cookieParser());

const authorize = function(req, res, next) {
 jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
   if (err) {
     return next(boom.create(401, 'Unauthorized'));
   }

   req.claim = payload;

   next();
 });
};

app.use('/api', require('./routes/players'));
app.use('/api', require('./routes/token'));
app.use('/api', authorize, require('./routes/scores'));
app.use('/api', authorize, require('./routes/combined_scores'));
app.use('/api', require('./routes/leagues'));
app.use('/api', require('./routes/players_leagues'));
app.use('/api', require('./routes/emails'));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
     return res
     .status(err.output.statusCode)
       .set('Content-Type', 'text/plain')
       .send(err.output.payload.message)
   }

  console.error(err.stack);
  res.sendStatus(500);
});

module.exports = app;
