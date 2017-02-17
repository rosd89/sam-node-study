const express = require('express');
const bodyParser = require('body-parser');
const retMsg = require('./api/v1/util/return.msg');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

const faq = require('./api/v1/faq/faq');

app.use('/api/v1/faqs', faq);

// 404 Not Found
app.use((req, res) => retMsg.error404NotFound(res));

module.exports = app;
