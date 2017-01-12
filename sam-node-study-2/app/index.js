const express = require('express');
const bodyParser = require('body-parser');
const retMst = require('./api/v1/util/return.msg');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

const hello = require('./api/v1/hello/hello');

app.use('/api/v1/hello', hello);

// 404 Not Found
app.use((req, res) => retMst.error404NotFound(res));

module.exports = app;
