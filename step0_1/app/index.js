const app = require('express')();
const middlewares = require('./middleware');
const routes = require('./routes');

// middleware 연동
middlewares.init(app);

// routes 연결
routes(app);

// Error middleware 연동
middlewares.error(app);

module.exports = app;
