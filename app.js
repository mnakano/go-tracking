/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// this will set/use our api to initial path of /api.
const router = require('./routes/router.js');
app.use('/api', router);

// all other request should be directed to the client.
app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: './client/build' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// use 5000 port no. for server.
const port = process.env.PORT || 5000;

// start the server using port 5000.
app.listen(port, () => {
  console.log('Server Started at ', port);
});

module.exports = app;
