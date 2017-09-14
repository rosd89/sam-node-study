const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing applic    ation/x-www-form-urlencoded

// not call Web API
app.use((req, res) => {
  res.status(404).send();
});

/**
 * Error Handler
 */
const error = require('./api/util/error.handler');
app.use(error);

module.exports = app;