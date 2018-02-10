const routes = [
  require('./api/v1/user')
];

module.exports = app => {
  routes.forEach(({path, router}) => app.use(path, router));
};
