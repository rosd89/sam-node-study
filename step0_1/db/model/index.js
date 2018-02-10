const models = [
  require('./user'),
  require('./userConnection')
];

module.exports = (obj, sequelize) => {
  models.forEach(v => v(obj, sequelize));

  return obj;
};
