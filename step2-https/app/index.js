const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello Express'));

module.exports = app;