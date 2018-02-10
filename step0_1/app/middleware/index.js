const middlewares = [
  require('./acao'),
  require('./bodyparser.js'),
  require('./bodyparser.urlencoded'),
  require('./cookiparser')
];

const error = [
  require('./defauleRoute.middleware')
];

module.exports = {
  init: app => {
    middlewares.forEach(m => app.use(m));
  },
  error: app => {
    error.forEach(m => app.use(m));
  }
};
