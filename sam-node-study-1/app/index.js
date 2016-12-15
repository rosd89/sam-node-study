const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

app.use((req, res) => {
    res.status(404).send('Sorry cant find that!');
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
