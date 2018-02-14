const routes = [
  // require('./api/v1/user'),
  require('./api/v1/connection')
];

module.exports = app => {
  routes.forEach(({path, router}) => app.use(path, router));
};
